export interface GitHubTreeItem {
    name: string;
    path: string;
    sha: string;
    unique_key: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    message: string | null;
    content: string | null;
    type: string;
}

export type GithubTreeMenuItem = {
    unique_key: string;
    path: string;
    name: string;
    type: string;
    sha: string;
    children: number;
    isTopLevel: boolean;
    isRoot: boolean;
    tree: GithubTreeMenuItem[];
};

export type GitHubTreeParentItem = {
    unique_key: string;
    name: string;
    children: number;
};

export type GitHubParentTree = {
    parent: GitHubTreeParentItem;
    tree: GitHubTreeParentItem[];
};

export interface GitHubTree {
    sha: string;
    tree: GitHubGitTreeItem[];
    truncated: boolean;
    url: string;
}

export interface GitHubGitTreeItem {
    unique_key: string;
    path: string;
    name: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
}
