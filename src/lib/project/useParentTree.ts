import { useEffect, useState } from 'react';
import { GitHubParentTree } from '@/types/gitHubData';
import { buildParentTreeForSearchPath } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';
import { useCurrentPath } from '@/lib/utility/uri';

export const useParentTree = () => {
    const store = useStore();
    const { path, isEmptyServerPath } = useCurrentPath();
    const [parentTree, setParentTree] = useState<GitHubParentTree>();

    useEffect(() => {
        if (isEmptyServerPath) return;

        const menuTree = store.menuTree.items;
        const result = buildParentTreeForSearchPath(path, menuTree);
        setParentTree({
            parent: result[0],
            tree: result,
        });
    }, [isEmptyServerPath, path, store.menuTree.items]);

    return parentTree;
};
