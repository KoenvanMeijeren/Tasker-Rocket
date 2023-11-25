import { Content } from '@/components/navigation/Content';
import { SideBar } from '@/components/navigation/sideBar/SideBar';
import { Providers } from '@/components/theme/providers';
import '@/styles/globals.css';
import { Flex } from '@chakra-ui/layout';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Flex height="100vh">
                <SideBar />
                <Content Component={Component} pageProps={pageProps} />
            </Flex>
        </Providers>
    );
}
