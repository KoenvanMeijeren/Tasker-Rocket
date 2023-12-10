import { Content } from '@/components/navigation/Content';
import { SideBar } from '@/components/navigation/sideBar/SideBar';
import { Providers } from '@/providers/Providers';
import '@/styles/globals.css';
import { Flex } from '@chakra-ui/layout';
import type { AppProps } from 'next/app';
import { Providers } from '@/components/theme/providers';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import { StrictMode } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <StrictMode>
            <Providers>
              <ErrorBoundary>
                <Flex height="100vh" overflow="hidden">
                    <SideBar />
                    <Content Component={Component} {...pageProps} />
                </Flex>
              </ErrorBoundary>
            </Providers>
        </StrictMode>
    );
}
