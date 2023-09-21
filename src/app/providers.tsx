'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme.config';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<ColorModeScript />
			<ChakraProvider>{children}</ChakraProvider>
		</CacheProvider>
	);
}
