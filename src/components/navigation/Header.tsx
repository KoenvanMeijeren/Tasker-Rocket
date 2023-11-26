import { Box, Flex, Spacer } from '@chakra-ui/layout';
import {
    Button,
    Show,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { themeConfig } from '../../../theme.config';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex
            alignItems="center"
            bg={themeConfig.menuBgColor}
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            borderBottomWidth="1px"
            height="70px"
            justifyContent="flex-end"
            px={4}
        >
            <Show above="md">
                <Box p="2">
                    <Breadcrumbs />
                </Box>
                <Spacer />
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? (
                        <MdDarkMode color="white" />
                    ) : (
                        <MdLightMode />
                    )}
                </Button>
            </Show>
        </Flex>
    );
};
