import { useRouter } from 'next/router';
import { MobxStore } from '../store/MobxStore';

export const useRepoSwitchHandler = (store: MobxStore) => {
    const router = useRouter();
    const changeSelectedItem = (item: string) => {
        router
            .push('/')
            .then(() => {
                const repoItem = store.repositoryConfig.items.find(
                    (repo) => repo.repository === item
                );
                if (!repoItem) return;
                store.gitHubItemsState.initRepository(repoItem.repository);
                store.repositoryConfig.setSelectedItem(repoItem);
            })
            .catch((e) => console.error(e));
    };

    return {
        changeSelectedItem,
    };
};
