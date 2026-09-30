import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual, createHash } from "node:crypto";

const SESSION_COOKIE_NAME = "ikhtiyaar_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET environment variable is missing.");
    }
    return "dev-fallback-secret-key-32-chars-minimum!!";
  }
  return secret;
}

/**
 * Constant-time string comparison using SHA-256 digests to prevent timing attacks.
 */
function safeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

/**
 * Validates given email and password against server environment variables.
 */
export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = (process.env.AUTH_EMAIL || "").trim().toLowerCase();
  const expectedPassword = process.env.AUTH_PASSWORD || "";

  if (!expectedEmail || !expectedPassword) {
    console.error("AUTH_EMAIL or AUTH_PASSWORD is not configured in environment variables.");
    return false;
  }

  const inputEmail = (email || "").trim().toLowerCase();
  const inputPassword = password || "";

  const emailMatch = safeEqual(inputEmail, expectedEmail);
  const passwordMatch = safeEqual(inputPassword, expectedPassword);

  return emailMatch && passwordMatch;
}

interface SessionPayload {
  email: string;
  exp: number;
}

function signPayload(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const hmac = createHmac("sha256", getAuthSecret()).update(data).digest("base64url");
  return `${data}.${hmac}`;
}

function parseAndVerifyToken(token: string): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expectedSignature = createHmac("sha256", getAuthSecret()).update(data).digest("base64url");
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const json = Buffer.from(data, "base64url").toString("utf-8");
    const payload = JSON.parse(json) as SessionPayload;

    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }

    const expectedEmail = (process.env.AUTH_EMAIL || "").trim().toLowerCase();
    if (expectedEmail && payload.email?.toLowerCase() !== expectedEmail) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Reads and verifies the current session from HTTP-only cookie.
 */
export async function getSession(): Promise<{ email: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = parseAndVerifyToken(token);
    if (!payload) return null;

    return { email: payload.email };
  } catch {
    return null;
  }
}

/**
 * Check if the user is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Enforce authentication in Server Components or redirect to login.
 */
export async function requireAuth(returnTo: string = "/admin") {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
}

/**
 * Creates and sets a secure, HTTP-only session cookie.
 */
export async function createSession(email: string) {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const token = signPayload({ email: email.trim().toLowerCase(), exp });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Destroys the session cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
