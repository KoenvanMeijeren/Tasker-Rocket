import { useMemo } from 'react';
import { FileType } from '@/types/extensions';
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
import { File } from '@/types/file';

export const useFileIcon = (file: File | undefined) => {
    return useMemo(() => {
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
};
