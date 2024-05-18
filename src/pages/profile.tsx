import GithubContentRepositoriesSettingsTab from '@/components/profile/tabs/GithubContentRepositoriesSettingsTab';
import { useColorConfig } from '@/lib/colors/useColorConfig';
import {
    Box,
    Container,
    Flex,
    Tab,
    TabList,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';

export default function Profile() {
    const colorConfig = useColorConfig();

    return (
        <Container maxW="container.lg" pt="6">
            <Flex direction="row" justifyContent="space-between">
                <Box
                    bg={colorConfig.backgroundSecondary}
                    borderRadius="sm"
                    className="m-auto"
                    width="75%"
                >
                    <Box p="4">
                        <Tabs>
                            <TabList>
                                <Tab>Update repository config</Tab>
                            </TabList>

                            <TabPanels>
                                <GithubContentRepositoriesSettingsTab />
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
