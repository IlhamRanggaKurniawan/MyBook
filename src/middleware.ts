import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname); // Add path to headers

  if(req.nextUrl.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")
    if(!token) {
      const url = req.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}