import { GitHubTreeContentItem } from '@/types/gitHubData';
import { useStore } from '@/lib/store';
import { useRepositoryContext } from '@/lib/repository/useRepository';
import { useEffect, useState } from 'react';

type GitHubTreeFolder = {
    name: string;
    url: string;
    unique_key: string;
    path: string;
    completed: boolean;
};

export const useFoldersContent = (data: GitHubTreeContentItem[]) => {
    const store = useStore();
    const { repository } = useRepositoryContext();

    const [folders, setFolders] = useState<GitHubTreeFolder[]>([]);

    useEffect(() => {
        const newFolders = data.map((item: GitHubTreeContentItem) => {
            return {
                name: item.name,
                url: item.url,
                unique_key: item.unique_key,
                path: item.path,
                completed: store.gitHubItemsState.isFolderCompleted(
                    repository,
                    item.unique_key ?? ''
                ),
            } as GitHubTreeFolder;
        });

        setFolders(newFolders);
    }, [data, repository, store.gitHubItemsState]);

    return { repository, folders };
};
