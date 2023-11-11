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
    parentKey: string | null;
    name: string;
    subTreeChildren: number;
    children: number;
};
