'use client';
import { GitHubTreeItem } from '@/types/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from './VerticalDivider';
import FileContentView from './fileView/FileContentView';
import { gitHubConfig } from '@/lib/repository/gitHubRepository';

type Data = {
    dirs: GitHubTreeItem[];
    files: GitHubTreeItem[];
};

export function ProjectView({
    data,
    parent,
}: {
    data: GitHubTreeItem[] | GitHubTreeItem;
    parent: string | undefined;
}) {
    const [content, setContent] = useState<Data | null>(null);

    // Retrieve repositoryName from local storage
    const repositoryNameFromStorage = localStorage.getItem('repositoryName');

    // Use the repositoryName from local storage or fallback to gitHubConfig
    const repositoryName = repositoryNameFromStorage ?? (gitHubConfig.content_repository.split('/').pop() ?? '');

    useEffect(() => {
        if (data) {
            setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));
        }
    }, [data]);

    if (!content) {
        return null;
    }

    return (
        <Box>
            {content.dirs && content.dirs.length > 0 ? (
                <FoldersSection
                    data={content.dirs}
                    label={parent ?? repositoryName ?? 'Projecten'}
                />
            ) : null}
            <Stack
                alignItems="flex-start"
                display="block"
                flexDirection="column"
                mb={3}
                px="60px"
                py="36px"
            >
                {content.files.map((item: GitHubTreeItem, index) => {
                    return (
                        <Box key={item.url}>
                            <FileContentView
                                contentUrl={item.download_url ?? ''}
                                key={item.url}
                                name={item.name}
                            />

                            {index !== content.files.length - 1 ? (
                                <VerticalDivider />
                            ) : null}
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}