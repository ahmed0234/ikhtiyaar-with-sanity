import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route handler to exit Next.js Draft Mode and return to normal published view
 */
export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const url = new URL(request.nextUrl);
  return NextResponse.redirect(new URL("/", url.origin));
}
