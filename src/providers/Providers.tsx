'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from '@/providers/SessionProvider';
import React from 'react';
import { MobxStoreProvider } from '@/lib/store/MobxStoreProvider';
import AppInitializerProvider from '@/providers/AppInitializerProvider';
import RepositoryProvider from '@/providers/RepositoryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    <MobxStoreProvider>
                        <RepositoryProvider>
                            <AppInitializerProvider>
                                {children}
                            </AppInitializerProvider>
                        </RepositoryProvider>
                    </MobxStoreProvider>
                </ChakraProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
