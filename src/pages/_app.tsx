import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';
import { StrictMode } from 'react';
import AppProviders from '@/components/providers/AppProviders';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <StrictMode>
            <AppProviders>
                <SidebarWithHeader>
                    <Component {...pageProps} />
                </SidebarWithHeader>
            </AppProviders>
        </StrictMode>
    );
}
