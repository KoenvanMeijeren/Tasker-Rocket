import { useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { MobxStore } from '../store/MobxStore';
import { RepositoryConfigItem } from '../store/slices/RepositoryConfigStore';

export const useRemoveRepoHandler = (store: MobxStore) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [repoErrorMessage, setRepoErrorMessage] = useState('');

    const openModal = () => {
        setRepoErrorMessage('');
        onOpen();
    };

    const removeRepository = useCallback(
        (card: RepositoryConfigItem) => {
            const active = store.repositoryConfig.selectedItem;
            if (active.repository === card.repository) {
                setRepoErrorMessage('Cannot remove active repository.');
            }
            store.repositoryConfig.removeRepository(card);
        },
        [store.repositoryConfig]
    );

    return {
        removeRepository,
        isOpen,
        openModal,
        onClose,
        repoErrorMessage,
    };
};
