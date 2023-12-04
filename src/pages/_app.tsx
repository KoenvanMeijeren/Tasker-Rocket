import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/components/theme/providers';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';
import ErrorBoundary from '@/components/error/ErrorBoundary';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <ErrorBoundary>
                <SidebarWithHeader>
                    <Component {...pageProps} />
                </SidebarWithHeader>
            </ErrorBoundary>
        </Providers>
    );
}
