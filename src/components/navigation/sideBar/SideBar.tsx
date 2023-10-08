import { NavSize } from '@/types/navSize';
import { Flex, Stack } from '@chakra-ui/layout';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import {
	FiBriefcase,
	FiCalendar,
	FiDollarSign,
	FiMenu,
	FiSettings,
	FiUser,
} from 'react-icons/fi';
import { themeConfig } from '../../../../theme.config';
import NavItem from './NavItem';
import { SideBarLogo } from './SideBarLogo';

export const SideBar = () => {
	const [navSize, changeNavSize] = useState(NavSize.Large);

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
				<NavItem
					active
					icon={FiCalendar}
					navSize={navSize}
					title="Race Simulator"
				/>
				<NavItem icon={FiUser} navSize={navSize} title="Reversi" />
				<NavItem icon={FiDollarSign} navSize={navSize} title="Web Dev" />
				<NavItem icon={FiBriefcase} navSize={navSize} title="QSD" />
				<NavItem
					icon={FiSettings}
					navSize={navSize}
					title="Games Programming"
				/>
			</Stack>

			{/* collapse/expand button */}
			<IconButton
				_hover={{ background: 'none' }}
				aria-label=""
				background="none"
				icon={<FiMenu />}
				mt={5}
				onClick={() => {
					if (navSize === NavSize.Small) changeNavSize(NavSize.Large);
					else changeNavSize(NavSize.Small);
				}}
			/>
		</Flex>
	);
};
