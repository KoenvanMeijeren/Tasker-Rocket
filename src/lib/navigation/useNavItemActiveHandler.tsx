import { GitHubParentTree, GithubTreeMenuItem } from '@/types/gitHubData';
import { useCurrentPath } from '@/lib/utility/uri';
import { useMemo } from 'react';

export const useNavItemActiveHandler = (
    item: GithubTreeMenuItem,
    parenTree: GitHubParentTree | undefined
) => {
    const { searchParams, pathWithoutQuery } = useCurrentPath();
    const openedFile = searchParams?.get('file');
    const isActive = pathWithoutQuery === `/${item.path}`;
    const isActiveFile = openedFile === item.name;
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
