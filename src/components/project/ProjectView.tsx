'use client';
import { GitHubParentTree, GitHubTreeContentItem } from '@/types/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import FoldersSection from './FoldersSection';
import FileContentView from '../fileView/FileContentView';
import { useProjectContent } from '@/lib/project/useProjectContent';

type Props = {
    data: GitHubTreeContentItem[] | GitHubTreeContentItem;
    parentTree: GitHubParentTree;
    openedFileName: string;
};

export function ProjectView({ data, parentTree, openedFileName }: Props) {
    const { content, repository } = useProjectContent(data);
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
                {content.files.map((item: GitHubTreeContentItem, index) => {
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
