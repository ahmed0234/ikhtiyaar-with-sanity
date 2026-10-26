import { NextResponse } from "next/server";
// Forwarded server-to-server, so the backend needs no CORS headers for this site.
const BACKEND_URL = (
  process.env.BACKEND_URL?.trim() || "https://ikhtiyaarbackend.vercel.app/"
).replace(/\/+$/, "");
// Trade options are editable in Sanity (landingPage.tradesList), so they are
// not checked against a fixed list here — only type and length are validated.
const labels: Record<string, string> = {
  firstName: "first name",
  lastName: "last name",
  email: "email",
  phone: "phone number",
  city: "city / service area",
  company: "business name",
  trade: "type of work",
};
// Behind a proxy request.url can carry an internal host, so also accept the
// host the visitor actually used.
function isSameOrigin(request: Request, origin: string) {
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const hosts = [
    new URL(request.url).host,
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
  ];
  return hosts.some((h) => h?.split(",")[0].trim() === originHost);
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !isSameOrigin(request, origin))
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  const bodyText = await request.text();
  if (bodyText.length > 6000)
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (body.website_url)
    return NextResponse.json({ error: "Unable to submit" }, { status: 400 });
  const values: Record<string, string> = {};
  for (const key of [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "company",
    "trade",
  ]) {
    const v = body[key];
    if (typeof v !== "string" || !v.trim())
      return NextResponse.json(
        { error: `Please enter your ${labels[key]}.` },
        { status: 400 },
      );
    if (v.length > 200)
      return NextResponse.json(
        { error: `Your ${labels[key]} is too long.` },
        { status: 400 },
      );
    values[key] = v.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  if (values.phone.replace(/\D/g, "").length < 7)
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  const payload = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    subject: `Business inquiry: ${values.company}`,
    website: "",
    message: `I'd like to discuss bringing in more work.\n\nBusiness: ${values.company}\nTrade: ${values.trade}\nCity / service area: ${values.city}\n\nSubmitted through the Ikhtiyaar website.`,
  };
  try {
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (response.ok) return NextResponse.json({ ok: true });
    const result = await response.json().catch(() => null);
    console.error(
      "Contact backend rejected submission",
      response.status,
      result,
    );
    // Backend validation errors (4xx) are about the visitor's input, so pass
    // the message through; anything else is a delivery failure.
    if (response.status >= 400 && response.status < 500 && result?.error)
      return NextResponse.json(
        { error: String(result.error) },
        { status: 400 },
      );
    return NextResponse.json(
      { error: "Unable to send right now" },
      { status: 502 },
    );
  } catch (err) {
    console.error("Contact backend request failed", err);
    return NextResponse.json(
      { error: "Unable to send right now" },
      { status: 502 },
    );
  }
}
