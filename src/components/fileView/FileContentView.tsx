import { useModeColors } from '@/hooks/useColors';
import { useGitHubFileContent } from '@/lib/repository/gitHubRepository';
import {
    removeFileExtension,
    urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import {
    CheckCircleIcon,
    ChevronDownIcon,
    DownloadIcon,
} from '@chakra-ui/icons';
import {
    Box,
    Button,
    Collapse,
    Divider,
    Icon,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { colorConfig } from '../../../theme.config';
import ImageView from './ImageView';
import './fileContentView.css';
import { File } from '@/types/file';
import CodeView from '@/components/fileView/CodeView';
import PdfFileView from '@/components/fileView/PdfFileView';
import MarkdownView from '@/components/fileView/MarkdownView';
import AudioView from '@/components/fileView/AudioView';
import VideoView from '@/components/fileView/VideoView';
import ExcelView from './ExcelView';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import {
    gitHubTreeItemsActions,
    isGitHubTreeItemCompleted,
} from '@/lib/store/githubItemState/slice';
import VerticalDivider from '@/components/VerticalDivider';
import { RiTodoFill } from 'react-icons/ri';

export default function FileContentView({
    parentKey,
    uniqueKey,
    name,
    contentUrl,
    lastItem,
}: {
    parentKey: string;
    uniqueKey: string;
    name: string;
    contentUrl: string;
    lastItem: boolean;
}) {
    const storeDispatcher = useAppDispatch();
    const { isOpen, onToggle } = useDisclosure();
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileViewable, setFileViewable] = useState(true);

    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const { backgroundColorSecondary, fontColor, border } = useModeColors();

    const { data, error, isLoading } = useGitHubFileContent(contentUrl);

    const itemsState = useAppSelector((state) => state.items);
    const isItemCompleted = isGitHubTreeItemCompleted(
        itemsState,
        parentKey,
        uniqueKey
    );

    const toggleTaskCompleted = () => {
        storeDispatcher(
            gitHubTreeItemsActions.toggleCompleted({
                parentKey: parentKey,
                itemKey: uniqueKey,
            })
        );
    };

    useEffect(() => {
        if (!data) return;

        const extension = urlToFileExtension(name);
        const fileInfo = findFileInfo(extension);
        const itemName =
            fileInfo.type === FileType.Markdown
                ? removeFileExtension(name)
                : name;

        setFile({
            name: itemName,
            extension,
            content: data,
            fileType: fileInfo.type,
            mimeType: fileInfo.mimeType,
        });
    }, [data, name]);

    const handleDownload = useCallback(() => {
        if (!file) return;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(file.content);
        // if file.name ends with .file.extension, remove the extension
        const fileName = removeFileExtension(file.name);
        link.download = fileName + '.' + file.extension;
        link.click();
    }, [file]);

    const content = useMemo(() => {
        if (!file) return;

        if (file.content.length < 1) {
            return <>Dit bestand bevat geen content.</>;
        }

        switch (file.fileType) {
            case FileType.Markdown:
                return <MarkdownView file={file} />;
            case FileType.Image:
                return <ImageView file={file} />;
            case FileType.Code:
                return <CodeView file={file} />;
            case FileType.Pdf:
                return <PdfFileView file={file} />;
            case FileType.Audio:
                return <AudioView file={file} />;
            case FileType.Video:
                return <VideoView file={file} />;
            case FileType.Docx:
            case FileType.PowerPoint:
            case FileType.Excel:
                return <ExcelView file={file} />;
            case FileType.Unsupported:
                setFileViewable(false);
                return (
                    <>
                        De weergave van dit bestandstype wordt niet ondersteund.
                        <Button
                            className="btn btn-green"
                            ml={3}
                            onClick={handleDownload}
                            size="sm"
                        >
                            <DownloadIcon mr={1} /> Download
                        </Button>
                    </>
                );
        }
    }, [file, handleDownload]);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !file) {
        return null;
    }

    return (
        <>
            <Box
                backgroundColor={backgroundColorSecondary}
                borderRadius={8}
                boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
                outline={isOpen ? `5px solid ${border}` : `0px solid ${border}`}
                p={2}
                transition="outline-width 200ms ease"
                zIndex={2}
            >
                {/* Task header (collapsible) */}
                <Box
                    alignItems="center"
                    cursor="pointer"
                    display="flex"
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
                            {file.name}
                        </Text>
                    </Box>
                    <Box>
                        <ChevronDownIcon
                            boxSize={10}
                            color={fontColor}
                            transform={rotate}
                            transition="all 0.2s linear"
                        />
                    </Box>
                </Box>

                {/* Content */}
                <Collapse in={isOpen}>
                    <Divider borderWidth={1.5} my={4} />
                    <Box px={4} py={4}>
                        <Box
                            className="btn-group"
                            display="flex"
                            justifyContent="flex-end"
                            mb={6}
                        >
                            {fileViewable ? (
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
                                        ? 'btn btn-danger'
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
                                    ) : null}
                                    {isItemCompleted ? (
                                        <Icon as={RiTodoFill} color="white" />
                                    ) : null}
                                    {/* eslint-disable-next-line react/jsx-max-depth */}
                                    <Text fontWeight="medium">
                                        {isItemCompleted
                                            ? 'Actief maken'
                                            : 'Done'}
                                    </Text>
                                </Box>
                            </button>
                        </Box>
                        {content}
                    </Box>
                </Collapse>
            </Box>

            {!lastItem ? <VerticalDivider /> : null}
        </>
    );
}
