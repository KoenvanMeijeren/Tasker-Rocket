'use client';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { GitHubParentTree, GitHubTreeItem } from '@/types/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import FoldersSection from './FoldersSection';
import FileContentView from '../fileView/FileContentView';
import { useRepositoryContext } from '@/lib/repository/useRepository';

type Data = {
    dirs: GitHubTreeItem[];
    files: GitHubTreeItem[];
};

type Props = {
    data: GitHubTreeItem[] | GitHubTreeItem;
    parentTree: GitHubParentTree;
    openedFileName: string;
};

export function ProjectView({ data, parentTree, openedFileName }: Props) {
    const { repository } = useRepositoryContext();
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
                <FoldersSection data={content.dirs} label={repository} />
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
                                defaultIsOpen={item.name === openedFileName}
                                isLastItem={index == content.files.length - 1}
                                item={item}
                                key={item.url}
                                parentTree={parentTree}
                            />
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
}
