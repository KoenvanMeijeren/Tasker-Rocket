'use client';
import { GitHubParentTree, GitHubTreeContentItem } from '@/types/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import FoldersSection from './FoldersSection';
import FileContentView from '../fileView/FileContentView';
import { useProjectContent } from '@/lib/project/useProjectContent';
import { Button } from '@chakra-ui/react';
import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';

type Props = {
    data: GitHubTreeContentItem[] | GitHubTreeContentItem;
    parentTree: GitHubParentTree;
};

const ProjectView = observer((props: Props) => {
    const store = useStore();
    const { data, parentTree } = props;
    const { content, repository, isOpen, onToggle, isLoading, handleFileLoad } =
        useProjectContent(store, data);
    if (!content) {
        return null;
    }

    return (
        <>
            {isLoading ? <LoadingIndicator /> : null}

            <Box display={isLoading ? 'none' : 'block'}>
                {content.dirs && content.dirs.length > 0 ? (
                    <FoldersSection data={content.dirs} label={repository} />
                ) : null}

                {content.files.length > 0 ? (
                    <Button onClick={onToggle}>
                        {isOpen ? 'Sluit Alles' : 'Open Alles'}
                    </Button>
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
                            <Box id={`file-${item.unique_key}`} key={item.url}>
                                <FileContentView
                                    isAllOpen={isOpen}
                                    isLastItem={
                                        index == content.files.length - 1
                                    }
                                    item={item}
                                    key={item.url}
                                    onLoad={handleFileLoad}
                                    parentTree={parentTree}
                                />
                            </Box>
                        );
                    })}
                </Stack>
            </Box>
        </>
    );
});

ProjectView.displayName = 'ProjectView';
export default ProjectView;
