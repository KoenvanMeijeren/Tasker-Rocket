import React, { createContext, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { RootStore } from '@/lib/store/RootStore';

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
    const mobxStore = useStore();
    const MobxContext = useMemo(
        () => createContext<RootStore>(mobxStore),
        [mobxStore]
    );

    return (
        <MobxContext.Provider value={mobxStore}>
            {children}
        </MobxContext.Provider>
    );
}
