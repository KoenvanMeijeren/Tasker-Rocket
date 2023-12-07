import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/providers/Providers';
import { Content } from '@/components/navigation/Content';
import { SideBar } from '@/components/navigation/sideBar/SideBar';
import { Flex } from '@chakra-ui/layout';
import { useContext } from 'react';
import { SessionContext } from '@/providers/SessionProvider';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Flex height="100vh" overflow="hidden">
                <SideBar />
                <Content Component={Component} {...pageProps} />
            </Flex>
        </Providers>
    );
}
