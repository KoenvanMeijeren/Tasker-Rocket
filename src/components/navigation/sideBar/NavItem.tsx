import { Flex, Link, Menu, MenuButton } from '@chakra-ui/react';

import { NavSize } from '@/types/navSize';
import Heading from '../../textStyles/Heading';

interface NavItemProps {
	title: string;
	active?: boolean;
	navSize: NavSize;
}

export default function NavItem({
	title,
	active = false,
	navSize,
}: NavItemProps) {
	const bg = '#29ecac';
	return (
		<Flex
			alignItems={navSize === NavSize.Small ? 'center' : 'flex-start'}
			flexDir="column"
			mt={30}
			w="100%"
		>
			<Menu placement="right">
				<Link
					_hover={{ textDecor: 'none', backgroundColor: bg, opacity: '50%' }}
					backgroundColor={active ? bg : undefined}
					borderRadius={8}
					opacity="80%"
					p={3}
					w={navSize == NavSize.Large ? '100%' : undefined}
				>
					<MenuButton w="100%">
						<Flex>
							<Heading color={active ? '#fff' : 'gray.500'}>TR</Heading>
							{navSize === NavSize.Large ? (
								<Heading
									color={active ? '#fff' : 'gray.300'}
									display="flex"
									ml={5}
									noOfLines={1}
								>
									{title}
								</Heading>
							) : null}
						</Flex>
					</MenuButton>
				</Link>
			</Menu>
		</Flex>
	);
}
