export interface GitHubTreeItem {
    unique_key: string; // Empty by default, needs to be manually set before usage.
    path: string;
    type: string;
    sha: string;
    size: number;
    url: string;
}

export interface GitHubTreeContentItem extends GitHubTreeItem {
    name: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    message: string | null;
    content: string | null;
}

export interface GitHubTreeGitItem extends GitHubTreeItem {
    mode: string;
}

export type GithubTreeMenuItem = GitHubTreeItem & {
    name: string;
    isTopLevel: boolean;
    isRoot: boolean;
    tree: GithubTreeMenuItem[];
};

export type GitHubTreeParentItem = {
    unique_key: string;
    name: string;
    children: number;
};

export interface GitHubTree {
    sha: string;
    tree: GitHubTreeGitItem[];
    truncated: boolean;
    url: string;
}

export type GitHubParentTree = {
    parent: GitHubTreeParentItem;
    tree: GitHubTreeParentItem[];
};
