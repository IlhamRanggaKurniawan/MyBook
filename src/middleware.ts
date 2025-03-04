import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname); // Add path to headers

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")
    const { data } = await axios.post(`${process.env.WEBSITE_URL}/api/auth/validate-token`, { token: token?.value })
    if (!data) {
      const url = req.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}