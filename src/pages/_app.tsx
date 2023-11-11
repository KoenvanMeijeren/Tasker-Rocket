import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/components/theme/providers';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';
import { StrictMode } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <StrictMode>
            <Providers>
                <SidebarWithHeader>
                    <Component {...pageProps} />
                </SidebarWithHeader>
            </Providers>
        </StrictMode>
    );
}
