import { useModeColors } from '@/hooks/useModeColors';
import { Box, Flex, Spacer } from '@chakra-ui/layout';
import {
    Button,
    Show,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';
import UserProfileCard from '../userProfile/UserProfileCard';

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { menuBackground } = useModeColors();
    const boxShadow = useColorModeValue(
        '0px -5px 10px rgba(0,0,0,0.5)',
        '0px -1px 15px rgba(0,0,0,0.75)'
    );
    return (
        <Flex
            alignItems="center"
            bg={menuBackground}
            boxShadow={boxShadow}
            height="70px"
            justifyContent="flex-end"
            position="relative"
            px={4}
            zIndex={3}
            // -5px 0px 10px
        >
            <Show above="md">
                <Box p="2">
                    <Breadcrumbs />
                </Box>
                <Spacer />
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? (
                        <MdDarkMode color="black" />
                    ) : (
                        <MdLightMode />
                    )}
                </Button>
                <UserProfileCard />
            </Show>
        </Flex>
    );
};
