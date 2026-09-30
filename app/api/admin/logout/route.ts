import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST(req: Request) {
  await destroySession();
  const url = new URL("/admin/login", req.url);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET(req: Request) {
  await destroySession();
  const url = new URL("/admin/login", req.url);
  return NextResponse.redirect(url, { status: 303 });
}
