import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { gitHubValidateRepository } from '../repository/gitHubRepository';
import { MobxStore } from '../store/MobxStore';
import { RepositoryConfigItem } from '../store/slices/RepositoryConfigStore';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';

export const useAddRepoHandler = (store: MobxStore) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [repoErrorMessage, setRepoErrorMessage] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    const openModal = () => {
        setRepoErrorMessage('');
        onOpen();
    };

    const addRepository = () => {
        const newRepoPath = (
            document.querySelector('#new-repo-path') as HTMLInputElement
        ).value;

        const isPrivate = (
            document.querySelector('#repo-private') as HTMLInputElement
        ).checked;

        const newRepoItem = {
            repository: newRepoPath,
            isPrivate: isPrivate,
        } as RepositoryConfigItem;

        setIsValidating(true);
        setRepoErrorMessage('');
        if (newRepoItem.repository.trim().length === 0) {
            setRepoErrorMessage('Repository path cannot be empty.');
            setIsValidating(false);
            return false;
        }

        gitHubValidateRepository(
            newRepoItem,
            getEnvValue(EnvOptions.GithubToken)
        )
            .then(() => {
                setIsValidating(false);
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
                return true;
            })
            .catch((e: unknown) => {
                if (e instanceof Error) {
                    setRepoErrorMessage(e.message);
                } else {
                    setRepoErrorMessage('Unknown error.');
                }
                setIsValidating(false);
                return false;
            });
    };

    return {
        addRepository,
        isOpen,
        openModal,
        onClose,
        repoErrorMessage,
        isValidating,
    };
};
