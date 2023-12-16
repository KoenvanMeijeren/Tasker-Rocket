import React, { useEffect } from 'react';
import { gitHubConfig, useGitHubTree } from '@/lib/repository/gitHubRepository';
import { buildIndexedGitHubTree } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';

type Props = {
    children: React.ReactNode;
};

export default function AppInitializerProvider({ children }: Props) {
    const store = useStore();
    const repository = gitHubConfig.content_repository;
    const { data, isLoading } = useGitHubTree();

    useEffect(() => {
        if (!data || isLoading) return;

        const result = buildIndexedGitHubTree(data.tree);
        store.indexedTree.initialize(result.items, result.menuTree);

        store.gitHubItems.initTree({
            repository,
            items: result.items,
        });
    }, [data, isLoading, repository, store.gitHubItems, store.indexedTree]);

    return children;
}
