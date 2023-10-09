import { NavSize } from '@/types/navSize';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Stack } from '@chakra-ui/layout';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { themeConfig } from '../../../../theme.config';
import NavItem from './NavItem';
import { SideBarLogo } from './SideBarLogo';

export const SideBar = () => {
	const [navSize, changeNavSize] = useState(NavSize.Large);
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
				<NavItem active navSize={navSize} title="Race Simulator" />
				<NavItem navSize={navSize} title="Reversi" />
				<NavItem navSize={navSize} title="Web Dev" />
				<NavItem navSize={navSize} title="QSD" />
				<NavItem navSize={navSize} title="Games Programming" />
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
