import { useCallback, useEffect, useState } from 'react';
import {
    removeFileExtension,
    urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { GitHubTreeItem } from '@/types/gitHubData';
import { File } from '@/types/file';

export const useFile = (item: GitHubTreeItem, data: Blob | undefined) => {
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
