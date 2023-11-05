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
            bg={useColorModeValue(
                themeConfig.lightModeBgColor,
                themeConfig.darkModeBgColor
            )}
            minH="100vh"
        >
            <SidebarContent
                display={{ base: 'none', md: 'block' }}
                onClose={() => onClose}
            />
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                onOverlayClick={onClose}
                placement="left"
                returnFocusOnClose={false}
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
