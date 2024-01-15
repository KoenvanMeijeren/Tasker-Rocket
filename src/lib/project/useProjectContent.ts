import { useRepositoryContext } from '@/lib/repository/useRepository';
import { useEffect, useState } from 'react';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { GitHubTreeContentItem } from '@/types/gitHubData';

type Data = {
    dirs: GitHubTreeContentItem[];
    files: GitHubTreeContentItem[];
};

export const useProjectContent = (
    data: GitHubTreeContentItem[] | GitHubTreeContentItem
) => {
    const { repository } = useRepositoryContext();
    const [content, setContent] = useState<Data | null>(null);

    useEffect(() => {
        if (!data) return;

        setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));
    }, [data]);

    return { repository, content };
};
