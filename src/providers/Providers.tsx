'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from '@/providers/SessionProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ProfileProvider>
                <CacheProvider>
                    <ChakraProvider theme={theme}>{children}</ChakraProvider>
                </CacheProvider>
            </ProfileProvider>
        </SessionProvider>
    );
}
