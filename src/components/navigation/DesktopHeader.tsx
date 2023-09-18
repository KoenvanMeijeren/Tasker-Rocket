import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Show, Spacer, useColorMode } from '@chakra-ui/react';

export function DesktopHeader() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Show above="md">
			<Box p="2">
				<Breadcrumbs />
			</Box>
			<Spacer />
			<Button onClick={toggleColorMode}>
				{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
			</Button>
		</Show>
	);
}
