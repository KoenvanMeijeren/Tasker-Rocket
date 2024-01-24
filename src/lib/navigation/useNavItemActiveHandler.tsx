import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { useCurrentPath } from '@/lib/utility/uri';
import { useMemo } from 'react';
import { MobxStore } from '@/lib/store/MobxStore';
import { parentRootKey } from '@/lib/utility/dataStructure';

export const useNavItemActiveHandler = (
    store: MobxStore,
    item: GithubTreeMenuItem,
    parentTree: GitHubParentTree | undefined,
    menuParentItem: GithubTreeMenuItem | undefined
) => {
    const { pathStripped } = useCurrentPath();
    const selectedRepository = store.repositoryConfig.selectedItem;

    const isOpen = store.menuTree.isItemActive(item);
    const isActive = pathStripped === `/${item.path}`;
    const isActiveFile = store.menuTree.isFileOpened(item.path);
    const isItemCompleted = store.gitHubItemsState.isCompleted(
        selectedRepository.repository,
        menuParentItem?.unique_key ?? parentRootKey,
        item.unique_key
    );
    const isFolderCompleted = store.gitHubItemsState.isFolderCompleted(
        selectedRepository.repository,
        item.unique_key
    );

    const isActiveInTree = useMemo(() => {
        if (!parentTree) return false;
        return parentTree.tree.some(
            (parentItem) => parentItem.unique_key === item.unique_key
        );
    }, [item.unique_key, parentTree]);

    return {
        isActive,
        isActiveFile,
        isActiveInTree,
        isOpen,
        isFolderCompleted,
        isItemCompleted,
    };
};
