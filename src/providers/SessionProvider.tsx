import supabase from '@/lib/supabase/db';
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

interface SessionContextTypes {
    session: Session;
}

export const SessionContext = createContext<SessionContextTypes | undefined>(
    undefined
);

export default function SessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [session, setSession] = useState<Session>();

    async function getSession() {
        const { data } = await supabase.auth.getSession();

        setSession(data.session);
    }

    useEffect(() => {
        void getSession();
    }, []);

    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    );
}
