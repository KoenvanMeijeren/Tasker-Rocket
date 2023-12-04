import useAuth from '@/hooks/useAuth';
import {
    Container,
    Heading,
    Stack,
    Button,
    Flex,
    Text,
    HStack,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export default function Login() {
    const { signIn } = useAuth();

    return (
        <Container
            maxW="lg"
            px={{ base: '0', sm: '8' }}
            py={{ base: '12', md: '24' }}
        >
            <Flex alignItems="center" direction="column">
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Stack
                            spacing={{ base: '2', md: '3' }}
                            textAlign="center"
                        >
                            <Heading marginBottom={2} size={{ base: 'xl' }}>
                                Welcome to Tasker Rocket
                            </Heading>
                        </Stack>
                    </Stack>
                </Stack>
                <Button
                    mt={4}
                    onClick={() => {
                        void signIn();
                    }}
                    p={2}
                    size={{ base: '2xl' }}
                >
                    <HStack>
                        <FaGithub size={30} />
                        <Text>Sign in with Github</Text>
                    </HStack>
                </Button>
            </Flex>
        </Container>
    );
}
