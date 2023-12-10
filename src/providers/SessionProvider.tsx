import supabase from '@/lib/supabase/db';
import { Session } from '@supabase/supabase-js';
import React, { createContext, useEffect, useState } from 'react';
import { useCustomToast } from '@/lib/utility/toast';

interface SessionContextTypes {
    session: Session | null;
}

export const SessionContext = createContext<SessionContextTypes>({
    session: null,
});

export default function SessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [session, setSession] = useState<Session | null>(null);
    const customToast = useCustomToast();

    async function getSession(): Promise<void> {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            customToast(error.name, error.message, 'error');
            return;
        }

        setSession(data.session);
    }
    useEffect(() => {
        void getSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    );
}
