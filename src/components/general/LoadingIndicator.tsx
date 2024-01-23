import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useColorConfig } from '@/lib/colors/useColorConfig';

export const LoadingIndicator = () => {
    const colorConfig = useColorConfig();

    return (
        <Box
            alignItems="center"
            display="flex"
            height="50vh"
            justifyContent="center"
        >
            <Spinner color={colorConfig.success} size="xl" thickness="4px" />
        </Box>
    );
};
