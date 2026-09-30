import { NextResponse } from "next/server";
import { checkCredentials, createSession } from "@/lib/auth";
import { sameOrigin } from "@/lib/blog";

export async function POST(req: Request) {
  if (req.headers.has("origin") && !sameOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  }

  try {
    const raw = await req.text();
    if (raw.length > 2000) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { email, password } = JSON.parse(raw);

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const isValid = checkCredentials(email, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSession(email);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Unable to sign in. Please try again." }, { status: 500 });
  }
}
