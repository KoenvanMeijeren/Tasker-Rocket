import { Box, Button, Show, Spacer, useColorMode } from '@chakra-ui/react';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import UserData from '../userData/UserDataView';

export function DesktopHeader() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Show above="md">
            <Box p="2">
                <Breadcrumbs />
            </Box>
            <Spacer />
            <Box alignItems="center" display="flex" flexDirection="row">
                {UserData()}
                <div className="m-2" />
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
                </Button>
            </Box>
        </Show>
    );
}
