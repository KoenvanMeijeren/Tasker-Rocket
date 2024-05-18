'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { MobxStoreProvider } from '@/lib/store/MobxStoreProvider';
import AppInitializerProvider from '@/providers/AppInitializerProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <MobxStoreProvider>
                    <AppInitializerProvider>{children}</AppInitializerProvider>
                </MobxStoreProvider>
            </ChakraProvider>
        </CacheProvider>
    );
}
