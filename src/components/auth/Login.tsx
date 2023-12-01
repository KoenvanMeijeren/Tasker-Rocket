import useAuth from '@/hooks/useAuth';
import { Container, Heading, Stack, Button, Flex } from '@chakra-ui/react';
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
                            <Heading size={{ base: 'xl'}} marginBottom={2}>
                                Log using your github account
                            </Heading>
                        </Stack>
                    </Stack>
                </Stack>
                <Button onClick={signIn} size={{base: '2xl'}}>
                    <FaGithub size={70}/>
                </Button>
            </Flex>
        </Container>
    );
}
