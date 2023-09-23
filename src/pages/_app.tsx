import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Providers } from '@/components/theme/providers';
import SidebarWithHeader from '@/components/navigation/SidebarWithHeader';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <SidebarWithHeader>
        <Component {...pageProps} />
      </SidebarWithHeader>
    </Providers>
  );
}
