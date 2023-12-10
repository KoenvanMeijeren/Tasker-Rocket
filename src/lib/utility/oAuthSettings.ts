import { SignInWithOAuthCredentials } from '@supabase/gotrue-js/dist/main/lib/types';

export const oAuthSettings: SignInWithOAuthCredentials = {
    provider: 'github',
    options: {
        scopes: 'repo read:org',
        redirectTo: 'http://localhost:3000/api/auth/callback',
    },
};
