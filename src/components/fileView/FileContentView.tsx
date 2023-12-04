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
    Flex,
    Icon,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FaFile,
    FaFileAudio,
    FaFileCode,
    FaFileExcel,
    FaFileImage,
    FaFilePdf,
    FaFilePowerpoint,
    FaFileVideo,
    FaFileWord,
    FaMarkdown,
} from 'react-icons/fa6';
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
import VerticalDivider from '@/components/general/VerticalDivider';
import { RiTodoFill } from 'react-icons/ri';
import { GitHubTreeParentItem } from '@/types/gitHubData';
import { parentRootKey } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';

type Props = {
    currentParent: GitHubTreeParentItem | undefined | null;
    uniqueKey: string;
    name: string;
    contentUrl: string;
    lastItem: boolean;
    parentTree: GitHubTreeParentItem[];
};

const FileContentView = observer((props: Props) => {
    const { currentParent, uniqueKey, name, contentUrl, lastItem, parentTree } =
        props;

    const store = useStore();
    const { isOpen, onToggle } = useDisclosure();
    const [file, setFile] = useState<File | undefined>(undefined);
    const [isFileViewable, setIsFileViewable] = useState(true);

    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const { backgroundColorSecondary, fontColor, border } = useModeColors();

    const { data, error, isLoading } = useGitHubFileContent(contentUrl);

    const isItemCompleted = store.gitHubItems.isCompleted(
        currentParent?.unique_key ?? parentRootKey,
        uniqueKey
    );

    const toggleTaskCompleted = () => {
        store.gitHubItems.toggleCompletedInTree({
            parentTree: parentTree,
            parentKey: currentParent?.unique_key ?? parentRootKey,
            itemKey: uniqueKey,
        });
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
                setIsFileViewable(false);
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

    const icon = useMemo(() => {
        if (!file) return;

        switch (file.fileType) {
            case FileType.Markdown:
                return <FaMarkdown />;
            case FileType.Image:
                return <FaFileImage />;
            case FileType.Code:
                return <FaFileCode />;
            case FileType.Pdf:
                return <FaFilePdf />;
            case FileType.Audio:
                return <FaFileAudio />;
            case FileType.Video:
                return <FaFileVideo />;
            case FileType.Docx:
                return <FaFileWord />;
            case FileType.PowerPoint:
                return <FaFilePowerpoint />;
            case FileType.Excel:
                return <FaFileExcel />;
            case FileType.Unsupported:
                return <FaFile />;
        }
    }, [file]);

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
                            <Flex align="center">
                                {icon}
                                <Text ml={1}>{file.name}</Text>
                            </Flex>
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
                                    {/* eslint-disable-next-line react/jsx-max-depth */}
                                    <Text fontWeight="medium">
                                        {isItemCompleted
                                            ? 'In progress'
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
});

FileContentView.displayName = 'FileContentView';
export default FileContentView;
