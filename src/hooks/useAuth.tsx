import supabase from '@/lib/supabase/db';
import { useRouter } from 'next/navigation';
import { oAuthSettings } from '@/lib/utility/oAuthSettings';
import { useCustomToast } from '@/lib/utility/toast';

export default function useAuth() {
    const router = useRouter();
    const customToast = useCustomToast();

    /**
     * SignIn user session with supabase
     */
    async function signIn(): Promise<void> {
        const { error } = await supabase.auth.signInWithOAuth(oAuthSettings);

        if (error) {
            customToast(error.name, error.message, 'error');
            return;
        }
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
