import { useEffect, useState } from 'react';
import { GitHubParentTree } from '@/types/gitHubData';
import { buildParentTreeForSearchPath } from '@/lib/utility/dataStructure';
import { useCurrentPath } from '@/lib/utility/uri';
import { MobxStore } from '@/lib/store/MobxStore';

const allowedRoutes = ['/[...path]', '/'];

export const useParentTree = (store: MobxStore) => {
    const { pathStripped, pathname, isEmptyServerPath } = useCurrentPath();
    const [parentTree, setParentTree] = useState<GitHubParentTree>();

    useEffect(() => {
        if (!allowedRoutes.includes(pathname)) return;
        if (isEmptyServerPath) return;

        const menuTree = store.menuTree.items;
        const result = buildParentTreeForSearchPath(pathStripped, menuTree);
        setParentTree({
            parent: result[0],
            tree: result,
        });
    }, [isEmptyServerPath, pathStripped, pathname, store.menuTree.items]);

    return parentTree;
};
