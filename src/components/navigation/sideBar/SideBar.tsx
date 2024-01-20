import { useModeColors } from '@/hooks/useModeColors';
import { NavSize } from '@/types/navSize';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { colorConfig } from '../../../../theme.config';
import { SideBarLogo } from './SideBarLogo';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/lib/store';
import { SessionContext } from '@/providers/SessionProvider';
import { useParentTree } from '@/lib/project/useParentTree';
import { useNavSizeHandler } from '@/lib/navigation/useNavSizeHandler';
import NavItem from '@/components/navigation/sideBar/NavItem';

const SideBar = observer(() => {
    const { session } = useContext(SessionContext);
    const store = useStore();
    const parentTree = useParentTree(store);
    const menuItems = store.menuTree.items;
    const { navSize, navCollapseClickHandler } = useNavSizeHandler();
    const { menuBackground } = useModeColors();

    const boxShadow = useColorModeValue(
        '-5px 0px 10px rgba(0,0,0,0.5)',
        '0px 0px 10px rgba(0,0,0,0.5)'
    );
    const sidebarWidth = navSize === NavSize.Small ? '4vw' : '20vw';

    if (!session) {
        return null;
    }

    return (
        <Box>
            <Stack
                bg={menuBackground}
                boxShadow={boxShadow}
                height="100vh"
                justifyContent="space-between"
                minWidth={sidebarWidth}
                position="relative"
                spacing={0}
                transition="all 0.5s ease"
                w={sidebarWidth}
                whiteSpace="nowrap"
                zIndex={3}
            >
                <SideBarLogo navSize={navSize} />

                {/* navitems */}
                <Stack
                    alignItems={
                        navSize === NavSize.Small ? 'center' : 'flex-start'
                    }
                    flex={1}
                    overflow={navSize === NavSize.Small ? 'hidden' : 'auto'}
                    p={3}
                    spacing={0}
                    width="100%"
                >
                    {menuItems.map((item) => (
                        <NavItem
                            item={item}
                            key={item.path}
                            navSize={navSize}
                            parentTree={parentTree}
                        />
                    ))}
                </Stack>

                {/* collapse/expand button */}
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    paddingBottom={4}
                    paddingTop={2}
                    px={2}
                    width="100%"
                >
                    <Button aspectRatio={1} onClick={navCollapseClickHandler}>
                        <ChevronLeftIcon
                            boxSize={8}
                            color={colorConfig.iconGrey}
                            transform={
                                navSize === NavSize.Small
                                    ? 'rotate(-180deg)'
                                    : 'rotate(0)'
                            }
                            transition="all 0.2s linear"
                        />
                    </Button>
                </Flex>
            </Stack>
        </Box>
    );
});

SideBar.displayName = 'SideBar';
export default SideBar;
