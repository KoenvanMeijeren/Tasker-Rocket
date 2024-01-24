import React, { useEffect } from 'react';
import { useGitHubTree } from '@/lib/repository/gitHubRepository';
import { buildMenuTree } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';
import { useRepositoryContext } from '@/lib/repository/useRepository';

type Props = {
    children: React.ReactNode;
};

export default function AppInitializerProvider({ children }: Props) {
    const store = useStore();
    const { repository, context: repositoryContext } = useRepositoryContext();
    const { data, isLoading } = useGitHubTree(repositoryContext);

    // Make sure that the repository is initialized, even if the data is not loaded yet.
    useEffect(() => {
        store.gitHubItemsState.initRepository(repository);
    });

    useEffect(() => {
        if (!data || isLoading) return;

        const result = buildMenuTree(data.tree);

        store.menuTree.initialize(result);
        store.gitHubItemsState.initTree(repository, result);
    }, [data, isLoading, repository, store.gitHubItemsState, store.menuTree]);

    return children;
}
