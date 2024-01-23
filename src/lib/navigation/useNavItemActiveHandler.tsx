import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { useCurrentPath } from '@/lib/utility/uri';
import { useMemo } from 'react';
import { MobxStore } from '@/lib/store/MobxStore';

export const useNavItemActiveHandler = (
    store: MobxStore,
    item: GithubTreeMenuItem,
    parentTree: GitHubParentTree | undefined
) => {
    const { pathStripped } = useCurrentPath();
    const isActive = pathStripped === `/${item.path}`;
    const isActiveFile = store.menuTree.isFileOpened(item.path);
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
    };
};
