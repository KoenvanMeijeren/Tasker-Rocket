import { NavSize } from '@/types/navSize';
import { Flex, Text } from '@chakra-ui/react';
import { TaskerLogo } from '../../icons/TaskerLogo';
import { useColorConfig } from '@/lib/colors/useColorConfig';

export const SideBarLogo = ({ navSize }: { navSize: NavSize }) => {
    const colorConfig = useColorConfig();
    const boxShadow = '-3px -5px 10px rgba(0,0,0,0.5)';

    return (
        <Flex
            alignItems="center"
            boxShadow={boxShadow}
            gap={3}
            justifyContent="center"
            minHeight="70px"
        >
            <TaskerLogo />
            {navSize === NavSize.Large ? (
                <Text
                    className="mr-1"
                    color={colorConfig.title}
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Tasker
                </Text>
            ) : null}
        </Flex>
    );
};
