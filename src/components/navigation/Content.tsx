import { useModeColors } from '@/hooks/useColors';
import { Flex } from '@chakra-ui/layout';
import type { AppProps } from 'next/app';
import { Header } from './Header';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Content = ({ Component, pageProps }: AppProps) => {
	const { backgroundColorPrimary } = useModeColors();
	return (
		<Flex backgroundColor={backgroundColorPrimary} flex={1} flexDir="column">
			<Header />

			{/* content */}
			<Component {...pageProps} />
		</Flex>
	);
};
