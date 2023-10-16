import { GitHubTreeItemType, GithubContent } from '@/types/githubTreeItemType';
import { GitHubTreeItem } from '@/types/gitHubData';

export function hasKeyInMap(map: object, key: string): boolean {
	return Object.keys(map).includes(key);
}

export const isFile = (file: GitHubTreeItem) =>
	file.type === (GitHubTreeItemType.File as string);

export const isDir = (file: GitHubTreeItem) =>
	file.type === (GitHubTreeItemType.Dir as string);

export const splitFilesAndDirs = (data: GitHubTreeItem[]) => {
	const dirs: GitHubTreeItem[] = [];
	const files: GitHubTreeItem[] = [];
	data.forEach((item) => {
		if (isDir(item)) {
			dirs.push(item);
		} else if (isFile(item)) {
			files.push(item);
		}
	});

	return { dirs, files } as GithubContent;
};

export function blobToString(blob: Blob) {
	const url = URL.createObjectURL(blob);
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send(null);
	URL.revokeObjectURL(url);
	return xhr.responseText;
}

export const blobFileToUrl = (blob: Blob, mimeType: string): string => {
	const newBlob = blob.slice(0, blob.size, mimeType);

	return URL.createObjectURL(newBlob);
};
