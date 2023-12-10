'use client';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { GitHubTreeItem } from '@/types/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from '../general/VerticalDivider';
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
    parent,
    openedFileName,
}: {
    data: GitHubTreeItem[] | GitHubTreeItem;
    parent: string;
    openedFileName: string;
}) {
    // make a useState for all file content states
    const [fileContentOpenStates, setFileContentOpenStates] = useState<{
        [key: string]: {
            fullScreen: boolean;
            contentUrl: string;
            isFileContentOpen: boolean;
        };
    }>({});

    const [content, setContent] = useState<Data | null>(null);

    // check if fullscreen in any of the file content states is true
    const isFullscreenOpen = Object.values(fileContentOpenStates).some(
        (item) => item.fullScreen
    );

    // update the file content state (fullscreen, isFileContentOpen)
    const updateFileContentToggle = (
        name: string,
        contentUrl: string,
        fullScreen: boolean,
        isFileContentOpen: boolean
    ) => {
        setFileContentOpenStates((prevState) => ({
            ...prevState,
            [name]: {
                contentUrl,
                fullScreen,
                isFileContentOpen,
            },
        }));
    };

    useEffect(() => {
        if (data) {
            setContent(splitFilesAndDirs(Array.isArray(data) ? data : [data]));
        }
    }, [data]);

    // set the file content states when the content is loaded
    useEffect(() => {
        if (content?.files) {
            const allContentStates: {
                [key: string]: {
                    fullScreen: boolean;
                    contentUrl: string;
                    isFileContentOpen: boolean;
                };
            } = {};

            content.files.forEach((item) => {
                allContentStates[item.name] = {
                    fullScreen: false,
                    contentUrl: item.download_url ?? '',
                    isFileContentOpen: false,
                };
            });

            setFileContentOpenStates(allContentStates);
        }
    }, [content]);

    // filter the file content states to only the ones that are fullscreen (otherwise the file content couldn't be rendered on line 123)
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
                    isFileContentOpen: boolean;
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

            {isFullscreenOpen ? (
                <Stack>
                    {Object.keys(filteredFileContentOpenStates).map((key) => {
                        const item = fileContentOpenStates[key];
                        return (
                            <Box key={key}>
                                <FileContentView
                                    contentUrl={item.contentUrl}
                                    defaultIsOpen={key === openedFileName}
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
                                defaultIsOpen={item.name === openedFileName}
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
