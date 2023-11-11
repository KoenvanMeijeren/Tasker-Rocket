'use client';

import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { FoldersSection } from './FoldersSection';
import FileContentView from '../fileView/FileContentView';
import { useAppDispatch } from '@/lib/redux/hooks';
import { gitHubTreeItemsActions } from '@/lib/redux/slices/githubTreeItemsSlice';

const repositoryName = getEnvValue(EnvOptions.GithubContentRepository)
    .split('/')
    .pop();

type Data = {
    dirs: GitHubTreeItem[];
    files: GitHubTreeItem[];
};

export function ProjectView({
    data,
    parent,
}: {
    data: GitHubTreeItem[] | GitHubTreeItem;
    parent: GitHubTreeParentItem | undefined | null;
}) {
    const storeDispatcher = useAppDispatch();
    const [content, setContent] = useState<Data | null>(null);

    useEffect(() => {
        if (!data) return;

        setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));

        if (parent) {
            storeDispatcher(gitHubTreeItemsActions.initTree(parent));
        }
    }, [data, parent, storeDispatcher]);

    if (!content) {
        return null;
    }

    return (
        <Box>
            {content.dirs && content.dirs.length > 0 ? (
                <FoldersSection
                    data={content.dirs}
                    label={parent?.unique_key ?? repositoryName ?? 'Projecten'}
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
                        <div key={item.unique_key ?? item.url}>
                            <FileContentView
                                contentUrl={item.download_url ?? ''}
                                key={item.unique_key ?? item.url}
                                lastItem={index == content.files.length - 1}
                                name={item.name}
                                parentKey={parent?.unique_key ?? 'default'}
                                uniqueKey={item.unique_key ?? item.url}
                            />
                        </div>
                    );
                })}
            </Stack>
        </Box>
    );
}
