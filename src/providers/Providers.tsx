'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from '@/providers/SessionProvider';
import ProfileProvider from '@/providers/ProfileProvider';
import React from 'react';
import GroupProvider from './GroupProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ProfileProvider>
                <CacheProvider>
                    <GroupProvider>
                        <ChakraProvider theme={theme}>
                            {children}
                        </ChakraProvider>
                    </GroupProvider>
                </CacheProvider>
            </ProfileProvider>
        </SessionProvider>
    );
}
