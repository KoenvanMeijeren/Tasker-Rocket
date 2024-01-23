import {
    Button,
    Card,
    CardBody,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
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
import { FaGithub, FaPlusSquare, FaRegTrashAlt } from 'react-icons/fa';
import './SettingsTab.css';

import { useState } from 'react';

export default function SettingsTab() {
    const [cards, setCards] = useState(['test', 'test1', 'test2'] as string[]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteCard = (card: string) => {
        setCards(cards.filter((c) => c !== card));
    };

    const addCard = () => {
        onClose();
        const newRepoPath = (
            document.querySelector('.newRepoPath') as HTMLInputElement
        ).value;
        setCards([...cards, newRepoPath]);
    };

    return (
        <TabPanel>
            <VStack spacing={4}>
                <Heading>Settings</Heading>
                <Text>Settings for Tasker Rocket.</Text>
                <Stack spacing={4} width="100%">
                    {cards.map((card) => (
                        <Card key={card} size="sm">
                            <CardBody>
                                <Text>{card}</Text>
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
                <Button colorScheme="blue" onClick={onOpen} variant="ghost">
                    <Text marginRight={1}>Add Card</Text>
                    <FaPlusSquare />
                </Button>
            </VStack>

            {/* Add card modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
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
                        </InputGroup>
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
}
