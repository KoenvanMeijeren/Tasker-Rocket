import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProviders } from '@/components/theme/themeProviders';
import SessionProvider from '@/providers/SessionProvider';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';
import { StrictMode } from 'react';
import AppProviders from '@/components/providers/AppProviders';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <ThemeProviders>
                <SidebarWithHeader>
                    <Component {...pageProps} />
                </SidebarWithHeader>
            </ThemeProviders>
        </SessionProvider>
    );
}
