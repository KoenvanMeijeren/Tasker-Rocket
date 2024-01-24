/* eslint-disable react/jsx-max-depth */
import { useGitHubFileContent } from '@/lib/repository/gitHubRepository';
import {
    CheckCircleIcon,
    ChevronDownIcon,
    DownloadIcon,
    Icon,
} from '@chakra-ui/icons';
import { Box, Button, Collapse, Divider, Flex, Text } from '@chakra-ui/react';
import './fileContentView.css';
import { GitHubParentTree, GitHubTreeContentItem } from '@/types/gitHubData';
import { observer } from 'mobx-react-lite';
import VerticalDivider from '@/components/general/VerticalDivider';
import { RiTodoFill } from 'react-icons/ri';
import {
    useFile,
    useFileHandlers,
    useFileOpenHandler,
} from '@/lib/project/useFileViewHandler';
import { useFileIcon } from '@/lib/project/useFileIcon';
import { useFileContent } from '@/lib/project/useFileContent';
import { useGitHubItemsStateHandlers } from '@/lib/project/useGitHubItemsStateHandlers';
import { useStore } from '@/lib/store';
import { useColorConfig } from '@/lib/colors/useColorConfig';
import { themeConfig } from '../../../theme.config';

type Props = {
    item: GitHubTreeContentItem;
    parentTree: GitHubParentTree;
    isLastItem: boolean;
    onLoad: (fileName: string) => void;
    isAllOpen: boolean;
};

const FileContentView = observer((props: Props) => {
    const store = useStore();
    const colorConfig = useColorConfig();

    const { item, parentTree, isLastItem, onLoad, isAllOpen } = props;
    const { download_url: contentUrl } = item;
    const { data, error, isLoading } = useGitHubFileContent(contentUrl ?? '');
    const file = useFile(item, data);
    const icon = useFileIcon(file);
    const { handleDownload } = useFileHandlers(file);
    const { isOpen, handleFileOpen, handleFileClose } = useFileOpenHandler(
        item,
        store.menuTree.isFileOpened(file?.path),
        onLoad,
        isAllOpen
    );
    const { content, isFileViewable } = useFileContent(file);
    const { isItemCompleted, toggleTaskCompleted } =
        useGitHubItemsStateHandlers(store, item, parentTree);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !file) {
        return null;
    }

    return (
        <>
            <Box
                alignItems="center"
                backgroundColor={colorConfig.backgroundSecondary}
                borderRadius={8}
                boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
                justifyContent="center"
                outline={
                    isOpen
                        ? `5px solid ${colorConfig.border}`
                        : `0px solid ${colorConfig.border}`
                }
                p={2}
                transition="outline-width 200ms ease"
            >
                {/* Task header (collapsible) */}
                <Box
                    alignItems="center"
                    backgroundColor={colorConfig.backgroundSecondary}
                    cursor="pointer"
                    display="flex"
                    flex={1}
                    justifyContent="space-between"
                    onClick={handleFileOpen}
                    position="sticky"
                    px={4}
                    top={0}
                    zIndex={1}
                >
                    <Box alignItems="center" display="flex" gap="10px">
                        {isItemCompleted ? (
                            <CheckCircleIcon color={colorConfig.success} />
                        ) : null}
                        {!isItemCompleted ? (
                            <Icon as={RiTodoFill} color={colorConfig.primary} />
                        ) : null}
                        <Text className="noselect" fontSize="18px">
                            <Flex align="center">
                                {icon}
                                <Text ml={1}>{file.name}</Text>
                            </Flex>
                        </Text>
                    </Box>
                    <ChevronDownIcon
                        boxSize={10}
                        color={themeConfig.iconGrey}
                        transform={isOpen ? 'rotate(-180deg)' : 'rotate(0)'}
                        transition="all 0.2s linear"
                    />
                </Box>

                {/* Content */}
                <Collapse in={isOpen}>
                    <Divider
                        borderColor={colorConfig.border}
                        borderWidth={1.5}
                        my={4}
                    />
                    <Box px={4} py={4}>
                        <Box
                            className="btn-group"
                            display="flex"
                            justifyContent="flex-end"
                            mb={6}
                        >
                            {isFileViewable ? (
                                <Button
                                    className="btn btn-gray"
                                    onClick={handleDownload}
                                    size="sm"
                                >
                                    <DownloadIcon />
                                </Button>
                            ) : null}
                            <button
                                className={
                                    isItemCompleted
                                        ? 'btn btn-primary'
                                        : 'btn btn-green'
                                }
                                onClick={toggleTaskCompleted}
                                type="button"
                            >
                                <Box
                                    alignItems="center"
                                    display="flex"
                                    gap="8px"
                                >
                                    {!isItemCompleted ? (
                                        <CheckCircleIcon color="white" />
                                    ) : (
                                        <Icon as={RiTodoFill} color="white" />
                                    )}
                                    <Text fontWeight="medium">
                                        {isItemCompleted
                                            ? 'Activate task'
                                            : 'Complete task'}
                                    </Text>
                                </Box>
                            </button>
                        </Box>

                        {content}

                        <Button
                            className="close-btn"
                            colorScheme="green"
                            onClick={() => handleFileClose()}
                        >
                            Close
                        </Button>
                    </Box>
                </Collapse>
            </Box>

            {!isLastItem ? <VerticalDivider /> : null}
        </>
    );
});

FileContentView.displayName = 'FileContentView';
export default FileContentView;
