import React, { useEffect } from 'react';
import { useGitHubTree } from '@/lib/repository/gitHubRepository';
import { buildIndexedGitHubTree, isDir } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';

type Props = {
    children: React.ReactNode;
};

export default function AppInitializerProvider({ children }: Props) {
    const store = useStore();
    const { data, isLoading } = useGitHubTree();

    useEffect(() => {
        if (!data || isLoading) return;

        const result = buildIndexedGitHubTree(data.tree);
        store.indexedTree.initialize(result.items, result.menuTree);

        result.items.forEach((item) => {
            if (!isDir(item)) return;

            store.gitHubItems.initTree({
                unique_key: item.unique_key,
                children: item.children,
            });
        });
    }, [data, isLoading, store.gitHubItems, store.indexedTree]);

    return children;
}
