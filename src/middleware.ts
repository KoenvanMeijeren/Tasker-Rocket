import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data, error } = await supabase.auth.getSession();

    if (error) return NextResponse.redirect(new URL('/auth-error', req.url));
    if (!data.session) return NextResponse.redirect(new URL('/login', req.url));

    return res;
}

export const config = {
    matcher: '/',
};
