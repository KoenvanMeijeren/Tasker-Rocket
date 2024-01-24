import SettingsTab from '@/components/profile/tabs/SettingsTab';
import { useColorConfig } from '@/lib/colors/useColorConfig';
import { SessionContext } from '@/providers/SessionProvider';
import {
    Avatar,
    Box,
    Container,
    Divider,
    Flex,
    Tab,
    TabList,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import ChangeProfileInfoTab from '../components/profile/tabs/ChangeProfileInfoTab';
import DeleteAccountTab from '../components/profile/tabs/DeleteAccountTab';

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
                                <Tab>Settings</Tab>
                                <Tab>Delete Profile</Tab>
                            </TabList>

                            <TabPanels>
                                <ChangeProfileInfoTab />
                                <SettingsTab />
                                <DeleteAccountTab />
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
