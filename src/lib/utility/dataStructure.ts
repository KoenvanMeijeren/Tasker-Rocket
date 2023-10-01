import { GitHubTreeItemType } from '@/types/githubTreeItemType';
import { GitHubTreeItem } from '../repository/gitHubData';

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

	return [dirs, files];
};
