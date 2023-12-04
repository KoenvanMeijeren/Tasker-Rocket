import supabase from '@/lib/supabase/db';
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

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

    async function getSession(): Promise<void> {
        const { data } = await supabase.auth.getSession();
        //TODO: Error handling?

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
