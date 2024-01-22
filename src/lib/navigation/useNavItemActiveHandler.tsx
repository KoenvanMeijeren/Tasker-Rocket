import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { useCurrentPath } from '@/lib/utility/uri';
import { useMemo } from 'react';
import { MobxStore } from '@/lib/store/MobxStore';

export const useNavItemActiveHandler = (
    store: MobxStore,
    item: GithubTreeMenuItem,
    parenTree: GitHubParentTree | undefined
) => {
    const { pathWithoutQuery } = useCurrentPath();
    const isActive = pathWithoutQuery === `/${item.path}`;
    const isActiveFile = store.menuTree.isFileOpened(item.path);
    const isActiveInTree = useMemo(() => {
        if (!parenTree) return false;
        return parenTree.tree.some(
            (parentItem) => parentItem.unique_key === item.unique_key
        );
    }, [item.unique_key, parenTree]);

    return {
        isActive,
        isActiveFile,
        isActiveInTree,
    };
};
