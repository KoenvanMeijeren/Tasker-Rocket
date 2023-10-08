import { Header } from '@/components/navigation/Header';
import { SideBar } from '@/components/navigation/sideBar/SideBar';
import { Providers } from '@/components/theme/providers';
import '@/styles/globals.css';
import { Flex } from '@chakra-ui/layout';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Flex minHeight="100vh" minWidth="100%">
				<SideBar />

				<Flex flex={1} flexDir="column">
					<Header />

					{/* content */}
					<Component {...pageProps} />
				</Flex>
			</Flex>
		</Providers>
	);
}
