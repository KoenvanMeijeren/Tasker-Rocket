import { Box, Button, Show, Spacer, useColorMode } from '@chakra-ui/react';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function DesktopHeader() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Show above="md">
			<Box p="2">
				<Breadcrumbs />
			</Box>
			<Spacer />
			<Button onClick={toggleColorMode}>
				{colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
			</Button>
		</Show>
	);
}
