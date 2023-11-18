import { ThemeProviders } from '@/components/theme/themeProviders';
import { RootStoreProvider } from '@/lib/store/RootStoreProvider';
import React from 'react';

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProviders>
            <RootStoreProvider>{children}</RootStoreProvider>
        </ThemeProviders>
    );
}
