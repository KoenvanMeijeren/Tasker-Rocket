import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { reconstructGithubTree } from '@/lib/utility/dataStructure';
import { NavSize } from '@/types/navSize';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Stack } from '@chakra-ui/layout';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { themeConfig } from '../../../../theme.config';
import NavItem from './NavItem';
import { SideBarLogo } from './SideBarLogo';

export type GithubTreeMenuItem = {
    path: string;
    name: string;
    type: string;
    url: string;
    tree: GithubTreeMenuItem[];
};

export type GithubTree = {
    tree: GithubTreeMenuItem[];
    url: string;
};

export const SideBar = () => {
    const { data } = useGitHubContentTree('', true);
    const [tree, setTree] = useState<GithubTreeMenuItem[]>([]);
    const [navSize, changeNavSize] = useState(NavSize.Large);

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

    return (
        <Stack
            bg={themeConfig.menuBgColor}
            height="100vh"
            justifyContent="space-between"
            minWidth={sidebarWidth}
            pos="sticky"
            spacing={0}
            transition="all 0.5s ease"
            w={sidebarWidth}
        >
            <SideBarLogo navSize={navSize} />

            {/* navitems */}
            <Stack
                alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },

                    '&::-webkit-scrollbar-thumb': {
                        background: '#616d79',
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
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                justifyContent="center"
                paddingBottom={4}
                paddingTop={2}
                px={2}
                width="100%"
            >
                <Button
                    aspectRatio={1}
                    onClick={() => {
                        if (navSize === NavSize.Small)
                            changeNavSize(NavSize.Large);
                        else changeNavSize(NavSize.Small);
                    }}
                >
                    <ChevronLeftIcon
                        boxSize={8}
                        color="white"
                        transform={rotate}
                        transition="all 0.2s linear"
                    />
                </Button>
            </Flex>
        </Stack>
    );
};
