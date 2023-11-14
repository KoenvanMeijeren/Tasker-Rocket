import {
    Box,
    Button,
    Flex,
    Show,
    Spacer,
    useColorMode,
} from '@chakra-ui/react';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import UserProfileCard from '@/components/userProfileCard/UserProfileCard';

export function DesktopHeader() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Show above="md">
            <Box p="2">
                <Breadcrumbs />
            </Box>
            <Spacer />
            <Flex alignItems="center" flexDirection="row">
                <UserProfileCard />
                <Box className="m-2" />
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
                </Button>
            </Flex>
        </Show>
    );
}
