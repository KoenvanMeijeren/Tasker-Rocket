import { useAddRepoHandler } from '@/lib/profile/useAddRepoHandler';
import { useStore } from '@/lib/store';
import { SessionContext } from '@/providers/SessionProvider';
import {
    Button,
    FormControl,
    FormLabel,
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
    Switch,
    Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { FaGithub, FaPlusSquare, FaTimes } from 'react-icons/fa';

export const AddRepoModal = observer(() => {
    const store = useStore();
    const { session } = useContext(SessionContext);
    const {
        addRepository,
        isOpen,
        openModal,
        onClose,
        repoErrorMessage,
        isValidating,
    } = useAddRepoHandler(store, session);

    return (
        <>
            <Button colorScheme="blue" onClick={openModal} variant="ghost">
                <FaPlusSquare />
                <Text ml={1}>Repository</Text>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add repository</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaGithub color="gray.300" />
                                <Text marginLeft={1}>/</Text>
                            </InputLeftElement>
                            <Input
                                id="new-repo-path"
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
                        <FormControl alignItems="center" display="flex" mt={1}>
                            <FormLabel htmlFor="email-alerts" mb="0">
                                Is repository private?
                            </FormLabel>
                            <Switch id="repo-private" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose} variant="ghost">
                            Close
                        </Button>
                        <Button
                            colorScheme="blue"
                            disabled={isValidating}
                            onClick={addRepository}
                            variant="ghost"
                        >
                            {isValidating ? 'Validating...' : 'Add'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
