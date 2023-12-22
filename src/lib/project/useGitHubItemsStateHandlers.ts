import { useStore } from '@/lib/store';
import { useRepositoryContext } from '@/lib/repository/useRepository';
import { GitHubParentTree, GitHubTreeItem } from '@/types/gitHubData';

export const useGitHubItemsStateHandlers = (
    item: GitHubTreeItem,
    parentTree: GitHubParentTree
) => {
    const store = useStore();
    const { repository } = useRepositoryContext();
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
