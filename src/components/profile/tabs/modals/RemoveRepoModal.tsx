import { useRemoveRepoHandler } from '@/lib/profile/useRemoveRepoHandler';
import { useStore } from '@/lib/store';
import { RepositoryConfigItem } from '@/lib/store/slices/RepositoryConfigStore';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FaRegTrashAlt } from 'react-icons/fa';

type Props = {
    card: RepositoryConfigItem;
};

export const RemoveRepoModal = observer(({ card }: Props) => {
    const store = useStore();
    const { removeRepository, openModal, onClose, isOpen } =
        useRemoveRepoHandler(store);

    return (
        <>
            <Button
                className="settingsDelete"
                colorScheme="red"
                onClick={openModal}
                variant="ghost"
            >
                <FaRegTrashAlt />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Remove repository</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/*  */}
                        <Text>
                            Are you sure you want to remove{' '}
                            <Text as="span" fontWeight="bold">
                                {card.repository}
                            </Text>
                            ?
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose} variant="ghost">
                            Close
                        </Button>
                        <Button
                            colorScheme="red"
                            isLoading={false}
                            loadingText="Removing"
                            onClick={() => removeRepository(card)}
                            variant="ghost"
                        >
                            Remove
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
