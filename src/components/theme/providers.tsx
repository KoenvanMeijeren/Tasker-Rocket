'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Unsubscribe } from '@reduxjs/toolkit';
import { startAppListening, store } from '@/lib/store/store';
import { setupGitHubItemStateListeners } from '@/lib/store/githubItemState/listener';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const subscriptions: Unsubscribe[] = [
            setupGitHubItemStateListeners(startAppListening),
        ];

        return () => subscriptions.forEach((unsubscribe) => unsubscribe());
    }, []);

    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <Provider store={store}>{children}</Provider>
            </ChakraProvider>
        </CacheProvider>
    );
}
