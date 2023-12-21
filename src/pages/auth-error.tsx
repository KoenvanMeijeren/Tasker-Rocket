import {
    Container,
    Stack,
    Heading,
    HStack,
    Button,
    VStack,
} from '@chakra-ui/react';
import { IoArrowRedoSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import SadLaptop from '@/components/icons/SadLaptop';

export default function AuthError() {
    const router = useRouter();

    return (
        <Container
            maxW="4xl"
            px={{ base: '0', sm: '8' }}
            py={{ base: '12', md: '24' }}
        >
            <VStack gap={20}>
                <SadLaptop />
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
                    leftIcon={<IoArrowRedoSharp />}
                >
                    <HStack>
                        <Heading fontSize="xl">Return to login page</Heading>
                    </HStack>
                </Button>
            </VStack>
        </Container>
    );
}
