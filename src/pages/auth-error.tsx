import {
    Container,
    Flex,
    Stack,
    Heading,
    HStack,
    Text,
    Button,
} from '@chakra-ui/react';
import { IoArrowRedoSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

export default function AuthError() {
    const router = useRouter();

    return (
        <Container
            maxW="4xl"
            px={{ base: '0', sm: '8' }}
            py={{ base: '12', md: '24' }}
        >
            <Flex alignItems="center" direction="column" gap={20}>
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: 'xl' }}>
                        Oops, there was an issue with authentication. Please try
                        again later.
                    </Heading>
                </Stack>
                <Button
                    mt={4}
                    onClick={() => {
                        void router.push('/login');
                    }}
                    p={2}
                    size={{ base: '2xl' }}
                >
                    <HStack>
                        <IoArrowRedoSharp />
                        <Text>Return to login page</Text>
                    </HStack>
                </Button>
            </Flex>
        </Container>
    );
}
