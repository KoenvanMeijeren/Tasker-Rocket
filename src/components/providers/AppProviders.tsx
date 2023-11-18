import { ThemeProviders } from '@/components/theme/themeProviders';
import { RootStoreProvider } from '@/lib/store/RootStoreProvider';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: Props) {
    return (
        <ThemeProviders>
            <RootStoreProvider>{children}</RootStoreProvider>
        </ThemeProviders>
    );
}
