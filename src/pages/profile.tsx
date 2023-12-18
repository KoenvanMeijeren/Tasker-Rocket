import { useContext } from 'react';
import { useModeColors } from '@/hooks/useModeColors';
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
import DeleteAccountTab from '../components/profile/tabs/DeleteAccountTab';
import ChangeProfileInfoTab from '../components/profile/tabs/ChangeProfileInfoTab';
import { SessionContext } from '@/providers/SessionProvider';
import { ProfileContext } from '@/providers/ProfileProvider';

export default function Profile() {
    const { backgroundColorSecondary } = useModeColors();
    const { session } = useContext(SessionContext);
    const { userData } = useContext(ProfileContext);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxW="container.lg" pt="6">
            <Flex direction="row" justifyContent="space-between">
                <Box
                    bg={backgroundColorSecondary}
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
                        <Text mt="2">First name: {userData.first_name}</Text>
                        <Text mt="2">Last name: {userData.last_name}</Text>
                    </Box>
                </Box>
                <Box
                    bg={backgroundColorSecondary}
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
