import { Box, Text } from '@chakra-ui/react';

interface TestProps {
    message: string;
}

const Test = ({ message }: TestProps) => {
    return (
        <Box>
            <Text>{message}</Text>
        </Box>
    );
};

export default Test;
