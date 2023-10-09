'use client';

import theme from '@/components/theme/theme';
import { GithubContentProvider } from '@/context/githubContentContext';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider>
			<GithubContentProvider>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</GithubContentProvider>
		</CacheProvider>
	);
}
