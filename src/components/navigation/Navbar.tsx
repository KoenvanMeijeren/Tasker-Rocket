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
		activatesOnPath: 'projecten',
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
		<Flex justify="center" mx="4" my="20" role="group" {...rest}>
			<Link
				_focus={{ boxShadow: 'none' }}
				as={NextLink}
				href={href}
				style={{ textDecoration: 'none' }}
			>
				<Box
					_hover={{
						bg: 'white',
						color: themeConfig.activeColor,
					}}
					backgroundColor={isActive ? 'white' : 'unset'}
					borderRadius="lg"
					color={isActive ? themeConfig.activeColor : themeConfig.menuTextColor}
					cursor="pointer"
					p={3}
					transition="all 0.3s"
				>
					{icon ? <Icon as={icon} fontSize="64" /> : null}
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
			alignItems="center"
			bg={useColorModeValue('white', themeConfig.darkModeBgColor)}
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			borderBottomWidth="1px"
			height="20"
			justifyContent={{ base: '', md: 'end' }}
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			{...rest}
		>
			<Hide above="md">
				<Spacer />

				<Flex>
					<Box mr={2}>
						<TaskerLogo />
					</Box>

					<Text
						color={themeConfig.menuTextColor}
						fontSize="2xl"
						fontWeight="bold"
					>
						Tasker
					</Text>
				</Flex>

				<Spacer />

				<IconButton
					aria-label="open menu"
					display="flex"
					icon={<FiMenu />}
					onClick={onOpen}
					variant="outline"
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
			bg={themeConfig.menuBgColor}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			h="full"
			pos="fixed"
			transition="3s ease"
			w={{ base: 'full', md: 60 }}
			{...rest}
		>
			<Flex align="center" mt={5}>
				<Spacer />

				<Box mr={2}>
					<TaskerLogo />
				</Box>

				<Text
					className="mr-1"
					color={themeConfig.menuTextColor}
					fontSize="2xl"
					fontWeight="bold"
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
					activatesOnPath={link.activatesOnPath}
					aria-label={link.name}
					href={link.href}
					icon={link.icon}
					key={link.name}
				/>
			))}
		</Box>
	);
};
