import { useCustomToast } from '@/lib/utility/toast';
import supabase from '@/lib/supabase/db';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/providers/SessionProvider';
import { useStore } from '@/lib/store';
import { GitHubTreeItemsState } from '@/lib/store/slices/GitHubTreeItemsStateStore';

interface ProgressData {
    state: GitHubTreeItemsState;
}

export function useUserProgress() {
    const customToast = useCustomToast();
    const store = useStore();
    const { session } = useContext(SessionContext);
    const [progressData, setProgressData] = useState<ProgressData>();

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
     * update database with new tree state
     */
    const updateDataToDatabase = async () => {
        const { error } = await supabase
            .from('users')
            .update([
                {
                    progress: JSON.stringify(store.gitHubItems),
                },
            ])
            .eq('user_id', session?.user.id);
        if (error) {
            if (error) customToast(error.details, error.message, 'error');
        }
    };

    return { progressData, updateDataToDatabase };
}
