import { useContext, useEffect, useState } from 'react';
import { GitHubParentTree } from '@/types/gitHubData';
import { buildParentTreeForSearchPath } from '@/lib/utility/dataStructure';
import { useCurrentPath } from '@/lib/utility/uri';
import { MobxStore } from '@/lib/store/MobxStore';
import { SessionContext } from '@/providers/SessionProvider';

const allowedRoutes = ['/[...path]', '/'];

export const useParentTree = (store: MobxStore) => {
    const { path, pathname, isEmptyServerPath } = useCurrentPath();
    const sessionContext = useContext(SessionContext);
    const [parentTree, setParentTree] = useState<GitHubParentTree>();

    useEffect(() => {
        if (!allowedRoutes.includes(pathname)) return;
        if (isEmptyServerPath || !sessionContext.session) return;

        const menuTree = store.menuTree.items;
        const result = buildParentTreeForSearchPath(path, menuTree);
        setParentTree({
            parent: result[0],
            tree: result,
        });
    }, [
        isEmptyServerPath,
        path,
        pathname,
        sessionContext.session,
        store.menuTree.items,
    ]);

    return parentTree;
};
