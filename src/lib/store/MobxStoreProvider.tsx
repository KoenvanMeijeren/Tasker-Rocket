import React, { createContext, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { MobxStore } from '@/lib/store/MobxStore';

export function MobxStoreProvider({ children }: { children: React.ReactNode }) {
    const mobxStore = useStore();
    const MobxContext = useMemo(
        () => createContext<MobxStore>(mobxStore),
        [mobxStore]
    );

    return (
        <MobxContext.Provider value={mobxStore}>
            {children}
        </MobxContext.Provider>
    );
}
