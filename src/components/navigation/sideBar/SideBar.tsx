import { useModeColors } from '@/hooks/useColors';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { getFileNameFromUrl, getParentFromUrl } from '@/lib/utility/formatters';
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

function reconstructGithubTree(array: GithubTreeMenuItem[]) {
    const map = new Map<string, GithubTreeMenuItem>();
    array.forEach((item) => {
        map.set(item.path, {
            path: item.path,
            name: getFileNameFromUrl(item.path),
            type: item.type,
            url: item.url,
            tree: [],
        });
    });

    array.forEach((item) => {
        //if root node, return
        if (!item.path.includes('/')) {
            return;
        }
        const parentPath = getParentFromUrl(item.path);

        const parent = map.get(parentPath);
        const curr = map.get(item.path);
        if (!parent || !curr) throw new Error('parent or curr is undefined');
        parent.tree.push(curr);
    });

    const rootItems = array.filter((item) => !item.path.includes('/'));
    return rootItems.map((item) => map.get(item.path));
}

export const SideBar = () => {
    let { data } = useGitHubContentTree('', true);
    const [tree, setTree] = useState<GithubTreeMenuItem[]>([]);
    const [navSize, changeNavSize] = useState(NavSize.Large);

    const { fontColor } = useModeColors();

    const sidebarWidth = navSize === NavSize.Small ? '4vw' : '20vw';

    useEffect(() => {
        if (data) {
            data = data as GithubTree;
            const reconstructedTree = reconstructGithubTree(data.tree);
            setTree(reconstructedTree);
        }
    }, [data]);

    const rotate = useMemo(
        () => (navSize === NavSize.Small ? 'rotate(-180deg)' : 'rotate(0)'),
        [navSize]
    );

    return (
        <Stack
            bg={themeConfig.menuBgColor}
            height="100vh"
            justifyContent="space-between"
            minWidth={sidebarWidth}
            pos="sticky"
            spacing={0}
            transition="width 0.3s ease-in-out"
            w={sidebarWidth}
        >
            <SideBarLogo navSize={navSize} />

            {/* navitems */}
            <Stack
                alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                flex={1}
                overflow="auto"
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
                    aria-label=""
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
