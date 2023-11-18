'use client';

import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import FoldersSection from './FoldersSection';
import FileContentView from '../fileView/FileContentView';
import { useStore } from '@/lib/store';

const repositoryName = getEnvValue(EnvOptions.GithubContentRepository)
    .split('/')
    .pop();

type Data = {
    dirs: GitHubTreeItem[];
    files: GitHubTreeItem[];
};

export function ProjectView({
    data,
    currentParent,
    parentTree,
}: {
    data: GitHubTreeItem[] | GitHubTreeItem;
    currentParent: GitHubTreeParentItem | undefined | null;
    parentTree: GitHubTreeParentItem[];
}) {
    const store = useStore();
    const [content, setContent] = useState<Data | null>(null);

    useEffect(() => {
        if (!data) return;

        setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));

        // Init the parent tree, so we can complete the tree items later.
        parentTree.forEach((parentTreeItem) => {
            store.gitHubItems.initTree(parentTreeItem);
        });
    }, [data, parentTree, store]);

    if (!content) {
        return null;
    }

    return (
        <Box>
            {content.dirs && content.dirs.length > 0 ? (
                <FoldersSection
                    data={content.dirs}
                    label={currentParent?.name ?? repositoryName ?? 'Projecten'}
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
                        <FileContentView
                            contentUrl={item.download_url ?? ''}
                            currentParent={currentParent}
                            key={item.unique_key ?? item.url}
                            lastItem={index == content.files.length - 1}
                            name={item.name}
                            parentTree={parentTree}
                            uniqueKey={item.unique_key ?? item.url}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}
