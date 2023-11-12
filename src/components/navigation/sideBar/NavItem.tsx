import { Box, Collapse, Flex, Link, useDisclosure } from '@chakra-ui/react';

import { getParentFromUrl } from '@/lib/utility/formatters';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Heading from '../../textStyles/Heading';
import { GithubTreeMenuItem } from './SideBar';

interface NavItemProps {
	treeItem: GithubTreeMenuItem;
	active?: boolean;
	navSize: NavSize;
	tabs: number;
}

export default function NavItem({
	treeItem,
	active = false,
	navSize,
	tabs,
}: NavItemProps) {
	const { isOpen, onToggle } = useDisclosure();
	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const bg = '#29ecac';
	const marginLeft = tabs * 10;
	if (treeItem.tree.length > 0) {
		return (
			<Box
				alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
				flexDir="column"
				marginLeft={marginLeft}
				w="100%"
			>
				<Flex
					_hover={{ textDecor: 'none', backgroundColor: bg, opacity: '50%' }}
					alignItems="center"
					backgroundColor={active ? bg : undefined}
					borderRadius={8}
					cursor="pointer"
					onClick={onToggle}
					opacity="80%"
					p={3}
					w={navSize == NavSize.Large ? '100%' : undefined}
				>
					{/* LOGO */}
					<Heading color={active ? '#fff' : 'gray.500'}>TR</Heading>

					{/* TITLE */}
					{navSize === NavSize.Large ? (
						<Heading
							color={active ? '#fff' : 'gray.300'}
							display="flex"
							ml={5}
							noOfLines={1}
						>
							{treeItem.name}
						</Heading>
					) : null}

					<ChevronDownIcon
						boxSize={10}
						color="white"
						transform={rotate}
						transition="all 0.2s linear"
					/>
				</Flex>

				<Collapse in={isOpen}>
					{treeItem.tree.map((item) => (
						<NavItem
							key={item.path}
							navSize={navSize}
							tabs={tabs + 1}
							treeItem={item}
						/>
					))}
				</Collapse>
			</Box>
		);
	} else {
		const parent = getParentFromUrl(treeItem.path);
		const url = `/${encodeURIComponent(parent)}`;

		return (
			<Link href={`${url}?file=${treeItem.name}`}>
				<Flex
					_hover={{ textDecor: 'none', backgroundColor: bg, opacity: '50%' }}
					alignItems="center"
					backgroundColor={active ? bg : undefined}
					borderRadius={8}
					cursor="pointer"
					marginLeft={marginLeft}
					onClick={onToggle}
					opacity="80%"
					p={3}
					w={navSize == NavSize.Large ? '100%' : undefined}
				>
					{/* LOGO */}
					<Heading color={active ? '#fff' : 'gray.500'}>TR</Heading>

					{/* TITLE */}
					{navSize === NavSize.Large ? (
						<Heading
							color={active ? '#fff' : 'gray.300'}
							display="flex"
							ml={5}
							noOfLines={1}
						>
							{treeItem.name}
						</Heading>
					) : null}
				</Flex>
			</Link>
		);
	}
}
