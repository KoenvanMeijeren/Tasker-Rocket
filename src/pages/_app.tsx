import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/components/theme/providers';
import SessionProvider from '@/providers/SessionProvider';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <Providers>
                <SidebarWithHeader>
                    <Component {...pageProps} />
                </SidebarWithHeader>
            </Providers>
        </SessionProvider>
    );
}
