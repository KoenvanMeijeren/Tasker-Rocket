import {
    Button,
    Card,
    CardBody,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    TabPanel,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { FaGithub, FaPlusSquare, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import './SettingsTab.css';

import { useStore } from '@/lib/store';
import { RepositoryConfigItem } from '@/lib/store/slices/RepositoryConfigStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const SettingsTab = observer(() => {
    const store = useStore();
    const [cards, setCards] = useState<RepositoryConfigItem[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [repoErrorMessage, setRepoErrorMessage] = useState('');

    useEffect(() => {
        setCards(store.repositoryConfig.items);
    }, [store, cards]);

    const deleteCard = (card: RepositoryConfigItem) => {
        store.repositoryConfig.removeRepository(card);
    };

    const openModal = () => {
        setRepoErrorMessage('');
        onOpen();
    };

    const validateRepoPath = (path: string) => {
        setRepoErrorMessage('');
        if (path.trim().length === 0) {
            setRepoErrorMessage('Repository path cannot be empty.');
            return false;
        }
        return true;
    };

    const addCard = () => {
        const newRepoPath = (
            document.querySelector('.newRepoPath') as HTMLInputElement
        ).value;

        if (!validateRepoPath(newRepoPath)) {
            return;
        }

        const newRepoItem = {
            repository: newRepoPath,
            isPrivate: false,
        } as RepositoryConfigItem;
        try {
            store.repositoryConfig.addRepository(newRepoItem);
            onClose();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setRepoErrorMessage(e.message);
            } else {
                setRepoErrorMessage('Unknown error.');
            }
        }
    };

    return (
        <TabPanel>
            <VStack spacing={4}>
                <Heading>Settings</Heading>
                <Text>Settings for Tasker Rocket.</Text>
                <Stack spacing={4} width="100%">
                    {cards.map((card) => (
                        <Card key={card.repository} size="sm">
                            <CardBody>
                                <Text>{card.repository}</Text>
                                {/* delete button */}
                                <Button
                                    className="settingsDelete"
                                    colorScheme="red"
                                    onClick={() => deleteCard(card)}
                                    variant="ghost"
                                >
                                    <FaRegTrashAlt />
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </Stack>
                <Button colorScheme="blue" onClick={openModal} variant="ghost">
                    <Text marginRight={1}>Add Card</Text>
                    <FaPlusSquare />
                </Button>
            </VStack>

            {/* Add card modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add content repo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaGithub color="gray.300" />
                                <Text marginLeft={1}>/</Text>
                            </InputLeftElement>
                            <Input
                                className="newRepoPath"
                                placeholder="Repository path"
                                type="text"
                            />
                            {repoErrorMessage != '' ? (
                                <InputRightElement
                                    className="shake"
                                    color="red.600"
                                >
                                    <FaTimes />
                                </InputRightElement>
                            ) : null}
                        </InputGroup>
                        <Text color="red.600" fontSize="sm">
                            {repoErrorMessage}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose} variant="ghost">
                            Close
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={addCard}
                            variant="ghost"
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </TabPanel>
    );
});

SettingsTab.displayName = 'SettingsTab';
export default SettingsTab;
