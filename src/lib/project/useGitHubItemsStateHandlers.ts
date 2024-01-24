import { GitHubParentTree, GitHubTreeContentItem } from '@/types/gitHubData';
import { MobxStore } from '@/lib/store/MobxStore';

export const useGitHubItemsStateHandlers = (
    store: MobxStore,
    item: GitHubTreeContentItem,
    parentTree: GitHubParentTree
) => {
    const { repository } = store.repositoryConfig.selectedItem;
    const { unique_key: uniqueKey } = item;
    const { tree, parent } = parentTree;

    const isItemCompleted = store.gitHubItemsState.isCompleted(
        repository,
        parent.unique_key,
        uniqueKey
    );

    const toggleTaskCompleted = () => {
        store.gitHubItemsState.toggleCompletedInTree(
            repository,
            tree,
            parent.unique_key,
            uniqueKey
        );
    };

    return { isItemCompleted, toggleTaskCompleted };
};
