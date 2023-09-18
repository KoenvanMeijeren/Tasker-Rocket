import {
	Box,
	BoxProps,
	CloseButton,
	Flex,
	FlexProps,
	Hide,
	Icon,
	IconButton,
	Link,
	Spacer,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiMenu } from 'react-icons/fi';
import NextLink from 'next/link';
import { themeConfig } from '../../../theme.config';
import { AiOutlinePieChart } from 'react-icons/ai';
import { TbLayoutBoard } from 'react-icons/tb';
import { TaskerLogo } from '@/components/icons/TaskerLogo';
import { DesktopHeader } from '@/components/navigation/DesktopHeader';
import { useRouter } from 'next/router';

interface LinkItemProps {
	name: string;
	href: string;
	icon: IconType;
	activatesOnPath: string | undefined;
}

export const LinkItems: Array<LinkItemProps> = [
	{
		name: 'Dashboard',
		href: '/',
		icon: AiOutlinePieChart,
		activatesOnPath: '',
	},
	{
		name: 'Project',
		href: '#',
		icon: TbLayoutBoard,
		activatesOnPath: 'projecten/',
	},
];

interface NavItemProps extends FlexProps {
	href: string;
	icon: IconType;
	activatesOnPath: string | undefined;
}

export const NavItem = ({
	href,
	icon,
	activatesOnPath,
	...rest
}: NavItemProps) => {
	const currentPath = useRouter().asPath.replace('#', '');
	let isActive = currentPath === href;
	if (activatesOnPath) {
		isActive =
			activatesOnPath.length > 0 && currentPath.includes(activatesOnPath);
	}

	return (
		<Flex justify="center" my="20" mx="4" role="group" {...rest}>
			<Link
				as={NextLink}
				href={href}
				style={{ textDecoration: 'none' }}
				_focus={{ boxShadow: 'none' }}
			>
				<Box
					cursor="pointer"
					borderRadius="lg"
					p={3}
					_hover={{
						bg: 'white',
						color: themeConfig.activeColor,
					}}
					transition="all 0.3s"
					color={isActive ? themeConfig.activeColor : themeConfig.menuTextColor}
					backgroundColor={isActive ? 'white' : 'unset'}
				>
					{icon && <Icon fontSize="64" as={icon} />}
				</Box>
			</Link>
		</Flex>
	);
};

interface MobileOrHeaderProps extends FlexProps {
	onOpen: () => void;
}

export const MobileNavOrHeader = ({ onOpen, ...rest }: MobileOrHeaderProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', themeConfig.darkModeBgColor)}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: '', md: 'end' }}
			{...rest}
		>
			<Hide above="md">
				<Spacer />

				<Flex>
					<Box mr={2}>
						<TaskerLogo />
					</Box>

					<Text
						fontSize="2xl"
						fontWeight="bold"
						color={themeConfig.menuTextColor}
					>
						Tasker
					</Text>
				</Flex>

				<Spacer />

				<IconButton
					display="flex"
					onClick={onOpen}
					variant="outline"
					aria-label="open menu"
					icon={<FiMenu />}
				/>
			</Hide>

			<DesktopHeader />
		</Flex>
	);
};

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={themeConfig.menuBgColor}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex align="center" mt={5}>
				<Spacer />

				<Box mr={2}>
					<TaskerLogo />
				</Box>

				<Text
					fontSize="2xl"
					fontWeight="bold"
					className="mr-1"
					color={themeConfig.menuTextColor}
				>
					Tasker
				</Text>

				<Hide above="md">
					<Spacer />

					<CloseButton onClick={onClose} />
				</Hide>

				<Spacer />
			</Flex>

			{LinkItems.map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					href={link.href}
					activatesOnPath={link.activatesOnPath}
					aria-label={link.name}
				/>
			))}
		</Box>
	);
};
