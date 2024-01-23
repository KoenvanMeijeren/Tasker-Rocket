import { SessionContext } from '@/providers/SessionProvider';
import {
    Container,
    Box,
    Flex,
    Avatar,
    Text,
    Divider,
    Tabs,
    TabList,
    Tab,
    TabPanels,
} from '@chakra-ui/react';
import { useContext } from 'react';
import DeleteAccountTab from '../components/profile/tabs/DeleteAccountTab';
import ChangeProfileInfoTab from '../components/profile/tabs/ChangeProfileInfoTab';
import { useColorConfig } from '@/lib/colors/useColorConfig';

export default function Profile() {
    const { session } = useContext(SessionContext);
    const colorConfig = useColorConfig();

    return (
        <Container maxW="container.lg" pt="6">
            <Flex direction="row" justifyContent="space-between">
                <Box
                    bg={colorConfig.backgroundSecondary}
                    borderRadius="sm"
                    width="30%"
                >
                    <Box p="4" textAlign="center">
                        <Avatar
                            name={session?.user.user_metadata.user_name}
                            size="lg"
                            src={session?.user.user_metadata.avatar_url}
                        />
                        <Text fontWeight="bold">
                            {session?.user.user_metadata.user_name}
                        </Text>
                        <Divider mt="2" />
                    </Box>
                </Box>
                <Box
                    bg={colorConfig.backgroundSecondary}
                    borderRadius="sm"
                    width="68%"
                >
                    <Box p="4">
                        <Tabs>
                            <TabList>
                                <Tab>Update Profile Information</Tab>
                                <Tab>Delete Profile</Tab>
                            </TabList>

                            <TabPanels>
                                <ChangeProfileInfoTab />
                                <DeleteAccountTab />
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
