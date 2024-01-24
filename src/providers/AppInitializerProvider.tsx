import React, { useEffect } from 'react';
import { useGitHubTree } from '@/lib/repository/gitHubRepository';
import { buildMenuTree } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';

type Props = {
    children: React.ReactNode;
};

export default function AppInitializerProvider({ children }: Props) {
    const store = useStore();
    const selectedRepository = store.repositoryConfig.selectedItem;
    const { data, isLoading } = useGitHubTree(selectedRepository);

    // Make sure that the repository is initialized, even if the data is not loaded yet.
    useEffect(() => {
        store.gitHubItemsState.initRepository(selectedRepository.repository);
    });

    useEffect(() => {
        if (!data || isLoading) return;

        const result = buildMenuTree(data.tree);

        store.menuTree.initialize(result);
        store.gitHubItemsState.initTree(selectedRepository.repository, result);
    }, [
        data,
        isLoading,
        selectedRepository.repository,
        store.gitHubItemsState,
        store.menuTree,
    ]);

    return children;
}
