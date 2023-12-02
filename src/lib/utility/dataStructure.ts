import { GithubContent, GitHubTreeItemType } from '@/types/githubTreeItemType';
import {
    GitHubRecursiveTree,
    GitHubRecursiveTreeItem,
    GitHubTreeItem,
    GitHubTreeParentItem,
} from '@/types/gitHubData';
import objectHash from 'object-hash';

export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export const isDir = (file: GitHubTreeItem | GitHubRecursiveTreeItem) =>
    file.type === (GitHubTreeItemType.Dir as string) || file.type === 'tree';

export const isFile = (file: GitHubTreeItem | GitHubRecursiveTreeItem) =>
    file.type === (GitHubTreeItemType.File as string) || !isDir(file);

export const hashGitHubItem = (
    item: GitHubTreeItem | GitHubRecursiveTreeItem
) => {
    item.unique_key = objectHash({
        path: item.path,
        sha: item.sha,
        type: isDir(item) ? GitHubTreeItemType.Dir : GitHubTreeItemType.File,
    });
};

export const splitFilesAndDirs = (data: GitHubTreeItem[]) => {
    const dirs: GitHubTreeItem[] = [];
    const files: GitHubTreeItem[] = [];
    data.forEach((item) => {
        hashGitHubItem(item);

        if (isDir(item)) {
            dirs.push(item);
        } else if (isFile(item)) {
            files.push(item);
        }
    });

    return { dirs, files } as GithubContent;
};

interface GitHubIndexedData {
    [key: string]: {
        path: string;
        unique_key: string;
        children: number;
        isTopLevel: boolean;
    };
}

export const parentRootKey = 'root';
export const convertRecursiveTreeToIndexedByPath = (
    input: GitHubRecursiveTreeItem[]
): GitHubIndexedData => {
    const result: GitHubIndexedData = {};

    input.forEach((item) => {
        const pathParts = item.path.split('/').filter(Boolean);
        pathParts.pop();

        const searchParentPath = pathParts.join('/');
        if (hasKeyInMap(result, searchParentPath)) {
            result[searchParentPath].children++;
        }

        hashGitHubItem(item);
        result[item.path] = {
            path: item.path,
            unique_key: item.unique_key,
            children: 0,
            isTopLevel: pathParts.length === 0,
        };
    });

    const rootItems = Object.values(result).filter((item) => item.isTopLevel);

    result.root = {
        path: 'root',
        unique_key: parentRootKey,
        children: rootItems.length,
        isTopLevel: true,
    };

    return result;
};

export const recursiveTreeToParentTree = (
    searchPath: string,
    recursiveTree: GitHubRecursiveTree
): GitHubTreeParentItem[] => {
    const result: GitHubTreeParentItem[] = [];
    const indexedItems = convertRecursiveTreeToIndexedByPath(
        recursiveTree.tree
    );

    // Build the result array by traversing the search path parts
    const searchPathParts = searchPath.split('/').filter(Boolean);
    while (searchPathParts.length > 0) {
        const currentPath = searchPathParts.join('/');
        const item = indexedItems[currentPath];
        searchPathParts.pop();
        if (!item) {
            return [];
        }

        result.push({
            unique_key: item.unique_key,
            name: item.path,
            children: item.children,
        });
    }

    // Add the root item to the result array
    result.push({
        unique_key: parentRootKey,
        name: indexedItems.root.path,
        children: indexedItems.root.children,
    });

    return result;
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
