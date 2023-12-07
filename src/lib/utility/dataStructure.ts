import {
    GitHubRecursiveTree,
    GitHubRecursiveTreeItem,
    GitHubTreeItem,
    GithubTreeMenuItem,
    GitHubTreeParentItem,
} from '@/types/gitHubData';
import { GitHubTreeItemType, GithubContent } from '@/types/githubTreeItemType';
import {
    getFileNameFromUrl,
    getParentFromUrl,
    removeQueryParamsFromURl,
} from './formatters';
import objectHash from 'object-hash';

export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export const isDir = (
    file: GitHubTreeItem | GitHubRecursiveTreeItem | GithubTreeMenuItem
) => file.type === (GitHubTreeItemType.Dir as string) || file.type === 'tree';

export const isFile = (
    file: GitHubTreeItem | GitHubRecursiveTreeItem | GithubTreeMenuItem
) => file.type === (GitHubTreeItemType.File as string) || !isDir(file);

export const hashGitHubItem = (
    item: GitHubTreeItem | GitHubRecursiveTreeItem | GithubTreeMenuItem
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

export function reconstructGithubTree(tree: GithubTreeMenuItem[]) {
    const map = new Map<string, GithubTreeMenuItem>();
    tree.forEach((item) => {
        hashGitHubItem(item);

        map.set(item.path, {
            unique_key: item.unique_key,
            sha: item.sha,
            path: item.path,
            name: getFileNameFromUrl(item.path),
            type: item.type,
            url: item.url,
            tree: [],
        });
    });

    tree.forEach((item) => {
        //if root node, return
        if (!item.path.includes('/')) {
            return;
        }
        const parentPath = getParentFromUrl(item.path);

        const parent = map.get(parentPath);
        const current = map.get(item.path);
        if (!parent || !current)
            throw new Error('parent or current node is undefined');
        parent.tree.push(current);
    });

    const rootItems = tree.filter((item) => !item.path.includes('/'));
    return rootItems.map((item) => {
        const treeItem = map.get(item.path);
        if (!treeItem) throw new Error('item is undefined');
        return treeItem;
    });
}

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
    searchPath = removeQueryParamsFromURl(searchPath);
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
