import { Box, Center, Divider } from '@chakra-ui/layout';
import { useColorConfig } from '@/lib/colors/useColorConfig';

export default function VerticalDivider() {
    const colorConfig = useColorConfig();

    return (
        <Box display="flex" justifyContent="flex-start">
            <Center height="40px" ml="60px" p="4px">
                <Divider
                    borderColor={colorConfig.border}
                    borderWidth={2}
                    opacity={1}
                    orientation="vertical"
                    zIndex={0}
                />
            </Center>
        </Box>
    );
}
