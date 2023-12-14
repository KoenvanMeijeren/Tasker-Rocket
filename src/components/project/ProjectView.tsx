'use client';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import FoldersSection from './FoldersSection';
import FileContentView from '../fileView/FileContentView';

const repositoryName = getEnvValue(EnvOptions.GithubContentRepository)
    .split('/')
    .pop();

type Data = {
    dirs: GitHubTreeItem[];
    files: GitHubTreeItem[];
};

export function ProjectView({
    data,
    openedFileName,
    parent,
    parentTree,
}: {
    data: GitHubTreeItem[] | GitHubTreeItem;
    openedFileName: string;
    parent?: GitHubTreeParentItem | undefined | null;
    parentTree?: GitHubTreeParentItem[];
}) {
    const [content, setContent] = useState<Data | null>(null);

    useEffect(() => {
        if (!data) return;

        setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));
    }, [data]);

    if (!content) {
        return null;
    }

    return (
        <Box>
            {content.dirs && content.dirs.length > 0 ? (
                <FoldersSection
                    data={content.dirs}
                    label={parent?.name ?? repositoryName ?? 'Projecten'}
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
                                currentParent={parent}
                                defaultIsOpen={item.name === openedFileName}
                                key={item.url}
                                lastItem={index == content.files.length - 1}
                                name={item.name}
                                parentTree={parentTree ?? []}
                                uniqueKey={item.unique_key ?? item.url}
                            />
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}
