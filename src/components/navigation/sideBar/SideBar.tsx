import { useModeColors } from '@/hooks/useModeColors';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { reconstructGithubTree } from '@/lib/utility/dataStructure';
import { NavSize } from '@/types/navSize';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { colorConfig } from '../../../../theme.config';
import NavItem from './NavItem';
import { SideBarLogo } from './SideBarLogo';
import { GithubTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { SessionContext } from '@/providers/SessionProvider';

export const SideBar = () => {
    const { session } = useContext(SessionContext);
    const { data } = useGitHubContentTree('', true);
    const [tree, setTree] = useState<GithubTreeMenuItem[]>([]);
    const [navSize, toggleNavSize] = useState(NavSize.Large);
    const { menuBackground, tint } = useModeColors();

    const boxShadow = useColorModeValue(
        '-5px 0px 10px rgba(0,0,0,0.5)',
        '0px 0px 10px rgba(0,0,0,0.5)'
    );

    const sidebarWidth = useMemo(
        () => (navSize === NavSize.Small ? '4vw' : '20vw'),
        [navSize]
    );

    const rotate = useMemo(
        () => (navSize === NavSize.Small ? 'rotate(-180deg)' : 'rotate(0)'),
        [navSize]
    );

    useEffect(() => {
        if (data) {
            const reconstructedTree = reconstructGithubTree(
                (data as GithubTree).tree
            );
            setTree(reconstructedTree);
        }
    }, [data]);

    if (!session) {
        return;
    }
    return (
        <Box overflowX="auto">
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
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },

                        '&::-webkit-scrollbar-thumb': {
                            background: tint,
                            borderRadius: '24px',
                        },
                    }}
                    flex={1}
                    overflow={navSize === NavSize.Small ? 'hidden' : 'auto'}
                    p={3}
                    spacing={0}
                    width="100%"
                >
                    <>
                        {tree.map((item) => (
                            <NavItem
                                key={item.path}
                                navSize={navSize}
                                root={true}
                                treeItem={item}
                            />
                        ))}
                    </>
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
                    <Button
                        aspectRatio={1}
                        onClick={() => {
                            toggleNavSize(
                                navSize === NavSize.Small
                                    ? NavSize.Large
                                    : NavSize.Small
                            );
                        }}
                    >
                        <ChevronLeftIcon
                            boxSize={8}
                            color={colorConfig.iconGrey}
                            transform={rotate}
                            transition="all 0.2s linear"
                        />
                    </Button>
                </Flex>
            </Stack>
        </Box>
    );
};
