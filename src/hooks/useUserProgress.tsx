import { useCustomToast } from '@/lib/utility/toast';
import supabase from '@/lib/supabase/db';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/providers/SessionProvider';
import { useStore } from '@/lib/store';

interface ProgressData {
    state: string;
}

export function useUserProgress() {
    const customToast = useCustomToast();
    const [progressData, setProgressData] = useState<ProgressData>();
    const { session } = useContext(SessionContext);
    const store = useStore();

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('progress')
            .eq('user_id', session?.user.id)
            .single();

        if (error) customToast(error.details, error.message, 'error');

        if (data?.progress) {
            const parsedData = JSON.parse(
                data.progress as string
            ) as ProgressData;
            setProgressData(parsedData);
        }
    };

    useEffect(() => {
        void fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * upsert database with new tree state
     */
    const upsertDataToDatabase = async () => {
        const { error: errorData } = await supabase
            .from('users')
            .update([
                {
                    progress: JSON.stringify(store.gitHubItems),
                },
            ])
            .eq('user_id', session?.user.id);

        if (errorData) {
            //TODO: add error toast
            console.log(errorData);
        }
    };

    return { progressData, upsertDataToDatabase };
}
