import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware function  
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    // If the user is authenticated and tries to access auth routes, redirect to /dashboard
    if (token && (
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') ||
        pathname === '/' ||
        pathname.startsWith('/verify')
    )) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If the user is not authenticated and tries to access protected routes, redirect to /home
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow other requests to proceed
    return NextResponse.next();
}

// Paths where we want to run middleware
export const config = {
    matcher: [
        '/sign-in',
        '/sign-in/:path*',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ],
};
