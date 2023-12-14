'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from '@/providers/SessionProvider';
import React from 'react';
import { MobxStoreProvider } from '@/lib/store/MobxStoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    <MobxStoreProvider>{children}</MobxStoreProvider>
                </ChakraProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
