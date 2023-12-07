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
    sha: string;
    path: string;
    name: string;
    type: string;
    url: string;
    tree: GithubTreeMenuItem[];
};

export type GithubTree = {
    sha: string;
    tree: GithubTreeMenuItem[];
    url: string;
    truncated: boolean;
};

export type GitHubTreeParentItem = {
    unique_key: string;
    name: string;
    children: number;
};

export interface GitHubRecursiveTree {
    sha: string;
    tree: GitHubRecursiveTreeItem[];
    truncated: boolean;
    url: string;
}

export interface GitHubRecursiveTreeItem {
    unique_key: string;
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
}
