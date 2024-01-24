import { MobxStore } from '../store/MobxStore';

export const useRepoSwitchHandler = (store: MobxStore) => {
    const changeSelectedItem = (item: string) => {
        const repoItem = store.repositoryConfig.items.find(
            (repo) => repo.repository === item
        );
        if (!repoItem) return;
        store.gitHubItemsState.initRepository(repoItem.repository);
        store.repositoryConfig.setSelectedItem(repoItem);
    };

    return {
        changeSelectedItem,
    };
};
