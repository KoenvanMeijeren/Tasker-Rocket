import { useRepositoryContext } from '@/lib/repository/useRepository';
import { useCallback, useEffect, useState } from 'react';
import { isDir, splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { GitHubTreeContentItem } from '@/types/gitHubData';
import { useDisclosure } from '@chakra-ui/react';

type Data = {
    dirs: GitHubTreeContentItem[];
    files: GitHubTreeContentItem[];
};

export const useProjectContent = (
    data: GitHubTreeContentItem[] | GitHubTreeContentItem
) => {
    const { repository } = useRepositoryContext();
    const [content, setContent] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedFiles, setLoadedFiles] = useState({});
    const { isOpen, onToggle } = useDisclosure();

    const handleFileLoad = useCallback((fileName: string) => {
        setLoadedFiles((prevState) => ({ ...prevState, [fileName]: true }));
    }, []);

    useEffect(() => {
        const allFilesLoaded = Object.values(loadedFiles).every(
            (val) => val === true
        );
        if (allFilesLoaded) {
            setIsLoading(false);
        }
    }, [loadedFiles]);

    useEffect(() => {
        if (!data) return;

        setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));

        setLoadedFiles({});
        if (!Array.isArray(data)) {
            if (!isDir(data)) {
                setLoadedFiles({ [data.name]: true });
            }
        } else {
            for (const item of data) {
                if (isDir(item)) continue;

                setLoadedFiles({ [item.name]: false });
            }
        }

        setIsLoading(true);
    }, [data]);

    return {
        repository,
        content,
        isOpen,
        onToggle,
        isLoading,
        handleFileLoad,
    };
};
