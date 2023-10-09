import { FileType } from '@/types/extensions';

export type File = {
	name: string;
	content: string;
	extension: string;
	fileType: FileType;
};
