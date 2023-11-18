'use client';

import theme from '@/components/theme/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    );
}
