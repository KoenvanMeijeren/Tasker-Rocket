import AudioView from '@/components/fileView/AudioView';
import CodeView from '@/components/fileView/CodeView';
import MarkdownView from '@/components/fileView/MarkdownView';
import OfficeFileView from '@/components/fileView/OfficeFileView';
import PdfFileView from '@/components/fileView/PdfFileView';
import VideoView from '@/components/fileView/VideoView';
import ExcelView from './ExcelView';
import { useModeColors } from '@/hooks/useModeColors';
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
import { AiOutlineFullscreen } from 'react-icons/ai';
import {
    Box,
    Button,
    Collapse,
    Divider,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colorConfig } from '../../../theme.config';
import ImageView from './ImageView';
import './fileContentView.css';
import { File } from '@/types/file';

export default function FileContentView({
    name,
    contentUrl,
    fileContentOpen,
    setFileContentOpen,
    defaultIsOpen,
}: {
    name: string;
    contentUrl: string;
    fileContentOpen: {
        [key: string]: {
            fullScreen: boolean;
            contentUrl: string;
            isFileContentOpen: boolean;
        };
    };
    setFileContentOpen: (
        name: string,
        contentUrl: string,
        fullScreen: boolean,
        isFileContentOpen: boolean
    ) => void;
    defaultIsOpen: boolean;
}) {
    // set the default state of the file content
    const [isFileContentOpen, setIsFileContentOpen] = useState(false);

    const { isOpen, onClose, onOpen } = useDisclosure({
        defaultIsOpen,
    });
    // Update the 'isOpen' state when 'defaultIsOpen' changes
    useEffect(() => {
        return defaultIsOpen ? onOpen() : onClose();
    }, [defaultIsOpen, onClose, onOpen]);

    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileViewable, setFileViewable] = useState(true);
    const { fullScreen } = fileContentOpen[name] || {
        fullScreen: false,
    };
    // keep track of the previous isOpen state
    const prevIsOpenRef = useRef(isFileContentOpen);

    const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
    const { backgroundColorSecondary, border } = useModeColors();

    const { data, error, isLoading } = useGitHubFileContent(contentUrl);

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
            downloadUrl: contentUrl,
        });
    }, [contentUrl, data, name]);

    // update the file content state when the fullscreen, isFilecontentOpen states changes
    useEffect(() => {
        setFileContentOpen(name, contentUrl, fullScreen, isFileContentOpen);
    }, [contentUrl, fullScreen, isFileContentOpen, name, setFileContentOpen]);

    // update the isOpen state when the fileContentOpen state changes
    useEffect(() => {
        if (
            fileContentOpen[name] &&
            fileContentOpen[name].isFileContentOpen !== prevIsOpenRef.current
        ) {
            setIsFileContentOpen(fileContentOpen[name].isFileContentOpen);
        }
        prevIsOpenRef.current = isFileContentOpen;
    }, [fileContentOpen, isFileContentOpen, name]);

    const handleDownload = useCallback(() => {
        if (!file) return;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(file.content);
        // if file.name ends with .file.extension, remove the extension
        const fileName = removeFileExtension(file.name);
        link.download = fileName + '.' + file.extension;
        link.click();
    }, [file]);

    // change the fullscreen state
    const handleToggle = () => {
        setFileContentOpen(
            name,
            contentUrl,
            !fileContentOpen[name]?.fullScreen,
            isFileContentOpen
        );
        setIsFileContentOpen(!isFileContentOpen);
    };

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
                return <OfficeFileView file={file} />;
            case FileType.PowerPoint:
                return <OfficeFileView file={file} />;
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
                onClick={() => {
                    setIsFileContentOpen(!isFileContentOpen);
                }}
                px={4}
            >
                <Box alignItems="center" display="flex" gap="10px">
                    <CheckCircleIcon boxSize="20px" color={colorConfig.green} />
                    <Text className="noselect" fontSize="18px">
                        {file.name}
                    </Text>
                </Box>

                <Box alignItems="center" display="flex">
                    <AiOutlineFullscreen onClick={handleToggle} size="20px" />
                    <ChevronDownIcon
                        boxSize={10}
                        color={colorConfig.iconGrey}
                        transform={rotate}
                        transition="all 0.2s linear"
                    />
                </Box>
            </Box>

            {/* Content */}
            <Collapse in={isFileContentOpen}>
                <Divider borderColor={border} borderWidth={1.5} my={4} />
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
                        <button className="btn btn-green" type="button">
                            <Box alignItems="center" display="flex" gap="8px">
                                <CheckCircleIcon color="white" />
                                <Text fontWeight="medium">Done</Text>
                            </Box>
                        </button>
                    </Box>
                    {content}
                </Box>
            </Collapse>
        </Box>
    );
}
