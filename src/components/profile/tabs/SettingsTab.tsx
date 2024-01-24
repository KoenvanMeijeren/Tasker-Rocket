import {
    Badge,
    Button,
    Card,
    CardBody,
    Heading,
    Stack,
    TabPanel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import './SettingsTab.css';

import { useStore } from '@/lib/store';
import { RepositoryConfigItem } from '@/lib/store/slices/RepositoryConfigStore';
import { observer } from 'mobx-react-lite';
import { AddRepoModal } from './modals/AddRepoModal';

const SettingsTab = observer(() => {
    const store = useStore();

    const deleteCard = (card: RepositoryConfigItem) => {
        store.repositoryConfig.removeRepository(card);
    };

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
                                    <Button
                                        className="settingsDelete"
                                        colorScheme="red"
                                        onClick={() => deleteCard(card)}
                                        variant="ghost"
                                    >
                                        <FaRegTrashAlt />
                                    </Button>
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
