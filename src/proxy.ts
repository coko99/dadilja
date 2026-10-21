import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PORTAL_COOKIE = "md_portal_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const isPortalApp =
    pathname.startsWith("/portal") &&
    pathname !== "/portal/login" &&
    !pathname.startsWith("/portal/login/");

  if (isPortalApp) {
    const token = request.cookies.get(PORTAL_COOKIE)?.value;
    if (!token) {
      const login = new URL("/portal/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|brand|icon|manifest\\.webmanifest).*)"],
};
