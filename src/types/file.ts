import { FileType } from '@/types/extensions';

export type File = {
    name: string;
    fullName: string;
    content: Blob;
    extension: string;
    fileType: FileType;
    mimeType: string;
    downloadUrl: string;
};
