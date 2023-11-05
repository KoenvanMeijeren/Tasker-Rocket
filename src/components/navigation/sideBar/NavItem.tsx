import { Collapse, Flex, useDisclosure } from '@chakra-ui/react';

import { getParentFromUrl } from '@/lib/utility/formatters';
import { NavSize } from '@/types/navSize';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Heading from '../../textStyles/Heading';
import { GithubTreeMenuItem } from './SideBar';

interface NavItemProps {
	treeItem: GithubTreeMenuItem;
	active?: boolean;
	navSize: NavSize;
}

export default function NavItem({
	treeItem,
	active = false,
	navSize,
}: NavItemProps) {
	const { isOpen, onToggle } = useDisclosure();
	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const bg = '#29ecac';
	if (treeItem.tree.length > 0) {
		return (
			<Flex
				alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
				flexDir="column"
				mt={30}
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
						<NavItem key={item.path} navSize={navSize} treeItem={item} />
					))}
				</Collapse>
			</Flex>
		);
	} else {
		const parent = getParentFromUrl(treeItem.path);
		const url = `/${encodeURIComponent(parent)}`;

		return (
			<Link
				// _hover={{ textDecor: 'none', backgroundColor: bg, opacity: '50%' }}
				href={{ pathname: url, query: { file: treeItem.name } }}
				style={{
					backgroundColor: active ? bg : undefined,
					borderRadius: 8,
					cursor: 'pointer',
					opacity: '80%',
					padding: 3,
					width: navSize == NavSize.Large ? '100%' : undefined,
				}}
			>
				<Flex>
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
