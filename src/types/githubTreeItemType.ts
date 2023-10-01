import { GitHubTreeItem } from '@/lib/repository/gitHubData';

export enum GitHubTreeItemType {
	Dir = 'dir',
	File = 'file',
}

export type GithubContent = {
	files: GitHubTreeItem[];
	dirs: GitHubTreeItem[];
};
