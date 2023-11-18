import React, { createContext } from 'react';
import { useStore } from '@/lib/store';
import { RootStore } from '@/lib/store/RootStore';

// Set another root store as default value here.
export const MobxContext = createContext<RootStore>(new RootStore());

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
    const mobxStore = useStore([]);

    return (
        <MobxContext.Provider value={mobxStore}>
            {children}
        </MobxContext.Provider>
    );
}
