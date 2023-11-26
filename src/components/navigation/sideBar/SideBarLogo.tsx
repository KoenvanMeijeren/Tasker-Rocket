import { NavSize } from '@/types/navSize';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { themeConfig } from '../../../../theme.config';
import { TaskerLogo } from '../../icons/TaskerLogo';

export const SideBarLogo = ({ navSize }: { navSize: NavSize }) => {
    return (
        <Flex
            alignItems="center"
            borderBottom="1px"
            borderBottomColor="gray.700"
            // a little hacky, but necessery to align with the bottom part of the sidebar
            borderRight="1px"
            borderRightColor={useColorModeValue('white', 'transparent')}
            gap={3}
            justifyContent="center"
            minHeight="70px"
        >
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
