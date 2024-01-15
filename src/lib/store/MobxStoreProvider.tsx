import React, { createContext, useMemo } from 'react';
import { initStore } from '@/lib/store';
import { MobxStore } from '@/lib/store/MobxStore';

export function MobxStoreProvider({ children }: { children: React.ReactNode }) {
    const mobxStore = initStore();
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
