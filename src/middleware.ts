import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname); // Add path to headers

  const token = req.cookies.get("token")

  return NextResponse.next({
    headers: requestHeaders,
  });
}