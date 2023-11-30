import supabase from '@/lib/supabase/db';
import { useRouter } from 'next/navigation';

export default function useLogin() {
    const router = useRouter();

    /**
     * SignIn user session with supabase
     */
    async function signIn() {
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                scopes: 'repo read:org',
                redirectTo: 'http://localhost:3000/api/auth/callback',
            },
        });
    }

    /**
     * SignOut user session with supabase
     */
    async function signOut() {
        await supabase.auth.signOut();
        router.refresh();
    }

    return {
        signIn,
        signOut,
    };
}
