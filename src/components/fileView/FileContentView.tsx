/* eslint-disable react/jsx-max-depth */
import { useModeColors } from '@/hooks/useModeColors';
import { useGitHubFileContent } from '@/lib/repository/gitHubRepository';
import {
    CheckCircleIcon,
    ChevronDownIcon,
    DownloadIcon,
    Icon,
} from '@chakra-ui/icons';
import {
    Box,
    Button,
    Collapse,
    Divider,
    Flex,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { colorConfig } from '../../../theme.config';
import './fileContentView.css';
import { GitHubParentTree, GitHubTreeContentItem } from '@/types/gitHubData';
import { observer } from 'mobx-react-lite';
import VerticalDivider from '@/components/general/VerticalDivider';
import { RiTodoFill } from 'react-icons/ri';
import { useFile, useFileHandlers } from '@/lib/project/useFileViewHandler';
import { useFileIcon } from '@/lib/project/useFileIcon';
import { useFileContent } from '@/lib/project/useFileContent';
import { useGitHubItemsStateHandlers } from '@/lib/project/useGitHubItemsStateHandlers';
import { useStore } from '@/lib/store';

type Props = {
    item: GitHubTreeContentItem;
    parentTree: GitHubParentTree;
    defaultIsOpen: boolean;
    isLastItem: boolean;
};

const FileContentView = observer((props: Props) => {
    const store = useStore();
    const { backgroundColorSecondary, border } = useModeColors();

    const { item, parentTree, defaultIsOpen, isLastItem } = props;
    const { download_url: contentUrl } = item;
    const { data, error, isLoading } = useGitHubFileContent(contentUrl ?? '');
    const file = useFile(item, data);
    const icon = useFileIcon(file);
    const { handleDownload } = useFileHandlers(file);
    const { content, isFileViewable } = useFileContent(file);
    const { isItemCompleted, toggleTaskCompleted } =
        useGitHubItemsStateHandlers(store, item, parentTree);

    const { isOpen, onToggle, onClose, onOpen } = useDisclosure({
        defaultIsOpen,
    });

    // Update the 'isOpen' state when 'defaultIsOpen' changes
    useEffect(() => {
        return defaultIsOpen ? onOpen() : onClose();
    }, [defaultIsOpen, onClose, onOpen]);

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
                backgroundColor={backgroundColorSecondary}
                borderRadius={8}
                boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
                justifyContent="center"
                outline={isOpen ? `5px solid ${border}` : `0px solid ${border}`}
                p={2}
                transition="outline-width 200ms ease"
            >
                {/* Task header (collapsible) */}
                <Box
                    alignItems="center"
                    cursor="pointer"
                    display="flex"
                    flex={1}
                    justifyContent="space-between"
                    onClick={onToggle}
                    px={4}
                >
                    <Box alignItems="center" display="flex" gap="10px">
                        {isItemCompleted ? (
                            <CheckCircleIcon color={colorConfig.green} />
                        ) : null}
                        {!isItemCompleted ? (
                            <Icon as={RiTodoFill} color={colorConfig.blue} />
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
                        color={colorConfig.iconGrey}
                        transform={isOpen ? 'rotate(-180deg)' : 'rotate(0)'}
                        transition="all 0.2s linear"
                    />
                </Box>

                {/* Content */}
                <Collapse in={isOpen}>
                    <Divider borderColor={border} borderWidth={1.5} my={4} />
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
                    </Box>
                </Collapse>
            </Box>

            {!isLastItem ? <VerticalDivider /> : null}
        </>
    );
});

FileContentView.displayName = 'FileContentView';
export default FileContentView;
