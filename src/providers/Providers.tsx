'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from '@/providers/SessionProvider';
import React from 'react';
import { RootStoreProvider } from '@/lib/store/RootStoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    <RootStoreProvider>{children}</RootStoreProvider>
                </ChakraProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
