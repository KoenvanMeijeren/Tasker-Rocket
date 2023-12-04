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
            fullScreen: boolean;
            contentUrl: string;
            isOpen: boolean;
        };
    }>({});

    const [content, setContent] = useState<Data | null>(null);

    const hasTrueValue = Object.values(fileContentOpenStates).some(
        (item) => item.fullScreen
    );

    const updateFileContentToggle = (
        name: string,
        contentUrl: string,
        fullScreen: boolean,
        isOpen: boolean
    ) => {
        setFileContentOpenStates((prevState) => ({
            ...prevState,
            [name]: {
                contentUrl,
                fullScreen,
                isOpen,
            },
        }));
    };

    useEffect(() => {
        if (data) {
            setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));
        }
    }, [data]);

    useEffect(() => {
        if (content?.files) {
            const allContentStates: {
                [key: string]: {
                    fullScreen: boolean;
                    contentUrl: string;
                    isOpen: boolean;
                };
            } = {};

            content.files.forEach((item) => {
                allContentStates[item.name] = {
                    fullScreen: false,
                    contentUrl: item.download_url ?? '',
                    isOpen: false,
                };
            });

            setFileContentOpenStates(allContentStates);
        }
    }, [content]);

    const filteredFileContentOpenStates = Object.entries(fileContentOpenStates)
        .filter(([, value]) => value.fullScreen)
        .reduce(
            (acc, [key, value]) => {
                acc[key] = value;
                return acc;
            },
            {} as {
                [key: string]: {
                    fullScreen: boolean;
                    contentUrl: string;
                    isOpen: boolean;
                };
            }
        );

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
                    {Object.keys(filteredFileContentOpenStates).map((key) => {
                        const item = fileContentOpenStates[key];
                        return (
                            <Box key={key}>
                                <FileContentView
                                    contentUrl={item.contentUrl}
                                    fileContentOpen={fileContentOpenStates}
                                    key={key}
                                    name={key}
                                    setFileContentOpen={(
                                        name,
                                        contentUrl,
                                        fullScreen,
                                        isOpen
                                    ) =>
                                        updateFileContentToggle(
                                            name,
                                            contentUrl,
                                            fullScreen,
                                            isOpen
                                        )
                                    }
                                />
                            </Box>
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
                                fileContentOpen={fileContentOpenStates}
                                key={item.url}
                                name={item.name}
                                setFileContentOpen={(
                                    name: string,
                                    contentUrl: string,
                                    fullScreen: boolean,
                                    isOpen: boolean
                                ) =>
                                    updateFileContentToggle(
                                        name,
                                        contentUrl,
                                        fullScreen,
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
