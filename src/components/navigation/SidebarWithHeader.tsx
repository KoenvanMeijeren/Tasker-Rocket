import { ReactNode } from 'react';
import {
	Box,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
} from '@chakra-ui/react';
import {
	MobileNavOrHeader,
	SidebarContent,
} from '@/components/navigation/Navbar';
import { themeConfig } from '../../../theme.config';

export default function SidebarWithHeader({
	children,
}: {
	children: ReactNode;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box
			minH="100vh"
			bg={useColorModeValue(
				themeConfig.lightModeBgColor,
				themeConfig.darkModeBgColor
			)}
		>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>

			<MobileNavOrHeader onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }}>{children}</Box>
		</Box>
	);
}
