import { useColorConfig } from '@/lib/colors/useColorConfig';
import { useStore } from '@/lib/store';
import { RepositoryConfigItem } from '@/lib/store/slices/RepositoryConfigStore';
import { Box, Flex, Spacer } from '@chakra-ui/layout';
import {
    Button,
    Select,
    Show,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';
import UserProfileCard from '../userProfile/UserProfileCard';

const Header = observer(() => {
    const store = useStore();
    const { colorMode, toggleColorMode } = useColorMode();
    const colorConfig = useColorConfig();
    const [repositories, setRepositories] = useState<RepositoryConfigItem[]>(
        []
    );

    const boxShadow = useColorModeValue(
        '0px -5px 10px rgba(0,0,0,0.5)',
        '0px -1px 15px rgba(0,0,0,0.75)'
    );

    useEffect(() => {
        setRepositories(store.repositoryConfig.items);
    }, [store, repositories]);

    return (
        <Flex
            alignItems="center"
            bg={colorConfig.menuBackground}
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
                <Select width={200}>
                    {repositories.map((repo) => (
                        <option key={repo.repository} value={repo.repository}>
                            {repo.repository}
                        </option>
                    ))}
                </Select>
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
});

Header.displayName = 'Header';
export default Header;
