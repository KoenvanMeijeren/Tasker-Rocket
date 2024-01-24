import { useColorConfig } from '@/lib/colors/useColorConfig';
import { useStore } from '@/lib/store';
import { Box, Flex, Spacer } from '@chakra-ui/layout';
import {
    Button,
    Select,
    Show,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';
import UserProfileCard from '../userProfile/UserProfileCard';

import { SessionContext } from '@/providers/SessionProvider';
import { useContext } from 'react';

const Header = observer(() => {
    const store = useStore();
    const { colorMode, toggleColorMode } = useColorMode();
    const colorConfig = useColorConfig();

    const { session } = useContext(SessionContext);

    const boxShadow = useColorModeValue(
        '0px -5px 10px rgba(0,0,0,0.5)',
        '0px -1px 15px rgba(0,0,0,0.75)'
    );

    const changeSelectedItem = (item: string) => {
        const repoItem = store.repositoryConfig.items.find(
            (repo) => repo.repository === item
        );
        if (!repoItem) return;
        store.gitHubItemsState.initRepository(repoItem.repository);
        store.repositoryConfig.setSelectedItem(repoItem);
    };

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
                {/* if session display the select */}
                {session ? (
                    <Select
                        onChange={(e) => changeSelectedItem(e.target.value)}
                        value={store.repositoryConfig.selectedItem?.repository}
                        width={200}
                    >
                        {store.repositoryConfig.items.map((repo) => (
                            <option
                                key={repo.repository}
                                value={repo.repository}
                            >
                                {repo.repository}
                            </option>
                        ))}
                    </Select>
                ) : null}
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
