'use client';
import { GitHubTreeItem } from '@/types/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from './VerticalDivider';
import FileContentView from './fileView/FileContentView';

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
    parent: string | undefined;
}) {
    const [fileContentOpenStates, setFileContentOpenStates] = useState<{
        [key: string]: {
            isOpen: boolean;
            contentUrl: string;
        };
    }>({});
    const [content, setContent] = useState<Data | null>(null);
    const hasTrueValue = Object.values(fileContentOpenStates).some(
        (item) => item.isOpen
    );

    const updateFileContentToggle = (
        name: string,
        contentUrl: string,
        isOpen: boolean
    ) => {
        setFileContentOpenStates((prevStates) => ({
            ...prevStates,
            [name]: {
                isOpen,
                contentUrl,
            },
        }));
    };

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

            {hasTrueValue ? (
                <Stack>
                    {content.files.map((item: GitHubTreeItem) => {
                        const isContentViewOpen =
                            fileContentOpenStates[item.name]?.isOpen || false;
                        return (
                            isContentViewOpen && (
                                <Box key={item.url}>
                                    <FileContentView
                                        contentUrl={
                                            fileContentOpenStates[item.name]
                                                ?.contentUrl || ''
                                        }
                                        fileContentOpen={isContentViewOpen}
                                        key={item.url}
                                        name={item.name}
                                        setFileContentOpen={(
                                            name: string,
                                            contentUrl: string,
                                            isOpen: boolean
                                        ) =>
                                            updateFileContentToggle(
                                                name,
                                                contentUrl,
                                                isOpen
                                            )
                                        }
                                    />
                                </Box>
                            )
                        );
                    })}
                </Stack>
            ) : (
                <Stack
                    alignItems="flex-start"
                    display="block"
                    flexDirection="column"
                    mb={3}
                    px="60px"
                    py="36px"
                >
                    {content.files.map((item: GitHubTreeItem, index) => (
                        <Box key={item.url}>
                            <FileContentView
                                contentUrl={item.download_url ?? ''}
                                fileContentOpen={
                                    fileContentOpenStates[item.name]?.isOpen ||
                                    false
                                }
                                key={item.url}
                                name={item.name}
                                setFileContentOpen={(
                                    name: string,
                                    contentUrl: string,
                                    isOpen: boolean
                                ) =>
                                    updateFileContentToggle(
                                        name,
                                        contentUrl,
                                        isOpen
                                    )
                                }
                            />
                            {index !== content.files.length - 1 ? (
                                <VerticalDivider />
                            ) : null}
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
}
