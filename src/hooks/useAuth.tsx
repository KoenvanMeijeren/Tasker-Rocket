import supabase from '@/lib/supabase/db';
import { useRouter } from 'next/navigation';

export default function useAuth() {
    const router = useRouter();

    /**
     * SignIn user session with supabase
     */
    async function signIn(): Promise<void> {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                scopes: 'repo read:org',
                redirectTo: 'http://localhost:3000/api/auth/callback',
            },
        });
        //TODO: Error handling?
    }

    /**
     * SignOut user session with supabase
     */
    async function signOut(): Promise<void> {
        await supabase.auth.signOut();
        router.refresh();
    }

    return {
        signIn,
        signOut,
    };
}
