import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';
import { NavSize } from '@/types/navSize';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Stack } from '@chakra-ui/layout';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { themeConfig } from '../../../../theme.config';
import NavItem from './NavItem';
import { SideBarLogo } from './SideBarLogo';

type GithubTreeItem = {
	path: string;
	type: string;
	url: string;
	tree: GithubTreeItem[];
};

export type GithubTree = {
	tree: GithubTreeItem[];
	url: string;
};

function reconstructGithubTree(array: GithubTreeItem[]) {
	const map = new Map<string, GithubTreeItem>();
	array.forEach((item) => {
		map.set(item.path, {
			path: item.path,
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
		const parentPath = item.path.split(/(.*\/)(.+)/)[1].replace(/\/$/, '');
		const parent = map.get(parentPath);
		const curr = map.get(item.path);
		if (!parent || !curr) throw new Error('parent or curr is undefined');
		parent.tree.push(curr);
	});

	const rootItems = array.filter((item) => !item.path.includes('/'));
	return rootItems.map((item) => map.get(item.path));
}

export const SideBar = () => {
	let { data } = useGitHubContentRootTree(true);
	const [tree, setTree] = useState<GithubTreeItem[]>([]);
	const [navSize, changeNavSize] = useState(NavSize.Large);

	useEffect(() => {
		if (data) {
			data = data as GithubTree;
			const reconstructedTree = reconstructGithubTree(data.tree);
			setTree(reconstructedTree);
		}
	}, [data]);

	const rotate = useMemo(
		() => (navSize === NavSize.Small ? 'rotate(-180deg)' : 'rotate(0)'),
		[navSize],
	);

	return (
		<Flex
			bg={themeConfig.menuBgColor}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			flexDir="column"
			justifyContent="space-between"
			maxHeight="100vh"
			minHeight="100vh"
			p={2}
			pos="sticky"
			transition="0.5s ease"
			w={navSize === NavSize.Small ? '75px' : '200px'}
		>
			<SideBarLogo navSize={navSize} />

			{/* navitems */}
			<Stack
				alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
				as="nav"
			>
				<>
					{tree.map((item) => (
						<NavItem key={item.path} navSize={navSize} title={item.path} />
					))}
				</>
			</Stack>

			{/* collapse/expand button */}
			<IconButton
				_hover={{ background: 'none' }}
				aria-label=""
				background="none"
				icon={<ChevronLeftIcon boxSize={8} />}
				onClick={() => {
					if (navSize === NavSize.Small) changeNavSize(NavSize.Large);
					else changeNavSize(NavSize.Small);
				}}
				transform={rotate}
				transition="all 0.2s linear"
			/>
		</Flex>
	);
};
