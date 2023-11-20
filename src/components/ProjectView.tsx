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
    const [content, setContent] = useState<Data | null>(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [fullscreenName, setFullscreenName] = useState<string>('');
    const [fullscreenContentUrl, setFullscreenContentUrl] =
        useState<string>('');
    const [fullscreenFileContentOpen, setFullscreenFileContentOpen] =
        useState(false);

    const updateVariableInChild = (
        name: string,
        contentUrl: string,
        fileContentOpen: boolean
    ) => {
        setFullScreen(!fullScreen);
        if (!fullScreen) {
            setFullscreenName(name);
            setFullscreenContentUrl(contentUrl);
            setFullscreenFileContentOpen(fileContentOpen);
        } else {
            setFullscreenFileContentOpen(fileContentOpen);
        }
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

            {!fullScreen ? (
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
                                fullscreenOpen={fullscreenFileContentOpen}
                                key={item.url}
                                name={item.name}
                                toggleFullScreen={updateVariableInChild}
                            />
                            {index !== content.files.length - 1 ? (
                                <VerticalDivider />
                            ) : null}
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Box key={fullscreenName}>
                    <FileContentView
                        contentUrl={fullscreenContentUrl ?? ''}
                        fullscreenOpen={fullscreenFileContentOpen}
                        key={fullscreenContentUrl}
                        name={fullscreenName}
                        toggleFullScreen={updateVariableInChild}
                    />
                </Box>
            )}
        </Box>
    );
}
