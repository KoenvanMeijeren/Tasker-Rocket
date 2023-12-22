import { File } from '@/types/file';
import { useMemo, useState } from 'react';
import { FileType } from '@/types/extensions';
import MarkdownView from '@/components/fileView/MarkdownView';
import ImageView from '@/components/fileView/ImageView';
import CodeView from '@/components/fileView/CodeView';
import PdfFileView from '@/components/fileView/PdfFileView';
import AudioView from '@/components/fileView/AudioView';
import VideoView from '@/components/fileView/VideoView';
import OfficeFileView from '@/components/fileView/OfficeFileView';
import ExcelView from '@/components/fileView/ExcelView';
import { Button } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useFileHandlers } from '@/lib/project/useFileViewHandler';

export const useFileContent = (file: File | undefined) => {
    const [isFileViewable, setIsFileViewable] = useState(true);
    const { handleDownload } = useFileHandlers(file);

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

    return { content, isFileViewable };
};
