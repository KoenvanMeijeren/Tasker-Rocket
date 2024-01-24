import { useGitHubTree } from '@/lib/repository/gitHubRepository';
import { useStore } from '@/lib/store';
import { buildMenuTree } from '@/lib/utility/dataStructure';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

type Props = {
    children: React.ReactNode;
};

const AppInitializerProvider = observer(({ children }: Props) => {
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
});

AppInitializerProvider.displayName = 'AppInitializerProvider';
export default AppInitializerProvider;
