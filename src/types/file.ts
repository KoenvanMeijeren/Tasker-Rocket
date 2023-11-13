import { FileType } from '@/types/extensions';

export type File = {
    name: string;
    content: Blob;
    extension: string;
    fileType: FileType;
    mimeType: string;
};
