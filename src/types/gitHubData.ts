export interface GitHubTreeItem {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    message: string | null;
    content: string | null;
    type: string;
    unique_key: string | null;
}

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
