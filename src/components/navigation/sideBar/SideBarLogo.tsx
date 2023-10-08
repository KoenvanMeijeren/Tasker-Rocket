import { NavSize } from '@/types/navSize';
import { Flex, Text } from '@chakra-ui/react';
import { themeConfig } from '../../../../theme.config';
import { TaskerLogo } from '../../icons/TaskerLogo';

export const SideBarLogo = ({ navSize }: { navSize: NavSize }) => {
	return (
		<Flex gap={3} justifyContent="center" mt={5}>
			<TaskerLogo />
			{navSize === NavSize.Large ? (
				<Text
					className="mr-1"
					color={themeConfig.menuTextColor}
					fontSize="2xl"
					fontWeight="bold"
				>
					Tasker
				</Text>
			) : null}
		</Flex>
	);
};
