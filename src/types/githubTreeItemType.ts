import { GitHubTreeContentItem } from '@/types/gitHubData';

export enum GitHubTreeItemType {
    Dir = 'dir',
    File = 'file',
}

export type GithubContent = {
    files: GitHubTreeContentItem[];
    dirs: GitHubTreeContentItem[];
};
