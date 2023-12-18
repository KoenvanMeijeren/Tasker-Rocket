import supabase from '@/lib/supabase/db';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionContext } from './SessionProvider';

interface UserData {
    email: string;
    first_name: string;
    last_name: string;
}

interface ProfileContextTypes {
    userData: UserData | null;
}

export const ProfileContext = createContext<ProfileContextTypes>({
    userData: null,
});

export default function ProfileProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userData, setUserData] = useState<UserData>();
    const { session } = useContext(SessionContext);

    const fetchData = async () => {
        const { data } = await supabase
            .from('users')
            .select('*')
            .eq('email', session?.user.email)
            .single();
        setUserData(data as UserData | undefined);
    };

    // retrieve user data from supabase
    useEffect(() => {
        void fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    async function updateUserData(firstName: string, lastName: string) {
        const { data, error } = await supabase
            .from('users')
            .update({ first_name: firstName, last_name: lastName })
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
            .select('*')
            .single();

        if (error) {
            console.error(error);
        }
        setUserData(data as UserData | undefined);
    }

    return (
        <ProfileContext.Provider value={{ userData, updateUserData }}>
            {children}
        </ProfileContext.Provider>
    );
}
