import { useRouter } from 'next/router';
import { MobxStore } from '../store/MobxStore';

export const useRepoSwitchHandler = (store: MobxStore) => {
    const router = useRouter();
    const saveState = (item: string) => {
        const repoItem = store.repositoryConfig.items.find(
            (repo) => repo.repository === item
        );
        if (!repoItem) return;
        store.gitHubItemsState.initRepository(repoItem.repository);
        store.repositoryConfig.setSelectedItem(repoItem);
    };

    const changeSelectedItem = (item: string) => {
        const currentPath = router.asPath;

        if (currentPath.includes('/[...path]')) {
            router
                .push('/')
                .then(() => {
                    saveState(item);
                })
                // eslint-disable-next-line no-console
                .catch((e: unknown) => console.error(e));
            return;
        }
        saveState(item);
    };

    return {
        changeSelectedItem,
    };
};
