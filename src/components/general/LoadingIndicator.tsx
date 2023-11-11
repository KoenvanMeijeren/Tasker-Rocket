import { Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { colorConfig } from '../../../theme.config';

export const LoadingIndicator = ({ height }: { height?: string }) => (
    <Box
        alignItems="center"
        display="flex"
        height={height ?? '50vh'}
        justifyContent="center"
    >
        <Spinner color={colorConfig.green} size="xl" thickness="4px" />
    </Box>
);
