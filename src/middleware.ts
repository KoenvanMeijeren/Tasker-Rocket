import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data, error } = await supabase.auth.getSession();
    const isTesting = process.env.CYPRESS_ENV === 'testing';

    if (error) return NextResponse.redirect(new URL('/auth-error', req.url));
    if (!data.session && !isTesting)
        return NextResponse.redirect(new URL('/login', req.url));

    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};
