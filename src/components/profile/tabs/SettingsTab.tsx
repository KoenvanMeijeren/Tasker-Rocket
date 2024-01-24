import {
    Badge,
    Card,
    CardBody,
    Heading,
    Stack,
    TabPanel,
    Text,
    VStack,
} from '@chakra-ui/react';
import './SettingsTab.css';

import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';
import { AddRepoModal } from './modals/AddRepoModal';
import { RemoveRepoModal } from './modals/RemoveRepoModal';

const SettingsTab = observer(() => {
    const store = useStore();

    return (
        <TabPanel>
            <VStack spacing={4}>
                <Heading>Settings</Heading>
                <Text>Settings for Tasker Rocket.</Text>
                <Stack spacing={4} width="100%">
                    {store.repositoryConfig.items.map((card) => (
                        <Card key={card.repository} size="sm">
                            <CardBody>
                                <Text>
                                    <Badge
                                        colorScheme={
                                            card.isPrivate ? 'red' : 'green'
                                        }
                                        mr={1}
                                    >
                                        {card.isPrivate ? 'Private' : 'Public'}
                                    </Badge>
                                    {card.repository}
                                </Text>
                                {card.repository !==
                                store.repositoryConfig.selectedItem
                                    ?.repository ? (
                                    <RemoveRepoModal card={card} />
                                ) : null}
                            </CardBody>
                        </Card>
                    ))}
                </Stack>
                <AddRepoModal />
            </VStack>
        </TabPanel>
    );
});

SettingsTab.displayName = 'SettingsTab';
export default SettingsTab;
