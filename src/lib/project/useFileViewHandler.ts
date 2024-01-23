import { useCallback, useEffect, useState } from 'react';
import {
    removeFileExtension,
    urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { GitHubTreeContentItem } from '@/types/gitHubData';
import { File } from '@/types/file';
import { useDisclosure } from '@chakra-ui/react';

export const useFile = (
    item: GitHubTreeContentItem,
    data: Blob | undefined
) => {
    const [file, setFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (!data) return;

        const { name, url: contentUrl } = item;
        const extension = urlToFileExtension(name);
        const fileInfo = findFileInfo(extension);
        const itemName =
            fileInfo.type === FileType.Markdown
                ? removeFileExtension(name)
                : name;

        setFile({
            name: itemName,
            fullName: name,
            path: item.path,
            extension,
            content: data,
            fileType: fileInfo.type,
            mimeType: fileInfo.mimeType,
            downloadUrl: contentUrl ?? '',
        });
    }, [data, item]);

    return file;
};

export const useFileHandlers = (file: File | undefined) => {
    const handleDownload = useCallback(() => {
        if (!file) return;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(file.content);
        // if file.name ends with .file.extension, remove the extension
        const fileName = removeFileExtension(file.name);
        link.download = fileName + '.' + file.extension;
        link.click();
    }, [file]);

    return { handleDownload };
};

export const useFileOpenHandler = (
    item: GitHubTreeContentItem,
    isFileOpened: boolean,
    onLoad: (fileName: string) => void,
    isAllOpen: boolean
) => {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
        defaultIsOpen: isFileOpened,
    });

    useEffect(() => {
        if (isFileOpened) {
            onOpen();
            return;
        }

        onClose();
    }, [isFileOpened, onClose, onOpen]);

    const handleFileOpen = useCallback(() => {
        onToggle();
    }, [onToggle]);

    useEffect(() => {
        if (!item) return;
        onLoad(item.name);
    }, [item, onLoad]);

    useEffect(() => {
        if (isAllOpen) {
            onOpen();
            return;
        }

        onClose();
    }, [isAllOpen, onClose, onOpen]);

    return { isOpen, handleFileOpen, handleFileClose: onClose };
};
