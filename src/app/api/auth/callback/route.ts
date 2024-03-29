import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { getEnvValue, EnvOptions } from '@/lib/utility/env';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const cookieStore = cookies();
        const supabase = createServerClient(
            getEnvValue(EnvOptions.SupabaseUrl),
            getEnvValue(EnvOptions.SupabaseKey),
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        cookieStore.delete({ name, ...options });
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(`${code}`);
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page
    return NextResponse.redirect(`${origin}/auth-error`);
}
