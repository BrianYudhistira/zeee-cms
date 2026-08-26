import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];

function isDashboardRoute(pathname: string) {
    return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

function isAuthRoute(pathname: string) {
    return authRoutes.includes(pathname);
}

function hasSessionCookie(request: NextRequest) {
    const hasClientAuth = Boolean(request.cookies.get("is_logged_in")?.value);
    if (hasClientAuth) return true;

    const hasLaravelSession = Boolean(request.cookies.get("laravel_session")?.value);
    if (hasLaravelSession) return true;

    return request.cookies.getAll().some(cookie => cookie.name.endsWith("_session"));
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
        return NextResponse.next();
    }

    const isAuthenticated = hasSessionCookie(request);

    console.info("[proxy] auth route check", {
        pathname,
        isAuthenticated,
    });

    if (pathname === "/") {
        const redirectUrl = isAuthenticated ? "/dashboard" : "/login";
        console.info(`[proxy] redirect ${pathname} -> ${redirectUrl}`);
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    if (isDashboardRoute(pathname) && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("error", "not_authenticated");
        console.info("[proxy] redirect unauthenticated dashboard access to login");
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute(pathname) && isAuthenticated) {
        console.info("[proxy] redirect authenticated auth route to /dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
