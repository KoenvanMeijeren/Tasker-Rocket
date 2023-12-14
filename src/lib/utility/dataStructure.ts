import {
    GitHubGitTreeItem,
    GitHubTreeItem,
    GithubTreeMenuItem,
    GitHubTreeParentItem,
} from '@/types/gitHubData';
import { GitHubTreeItemType, GithubContent } from '@/types/githubTreeItemType';
import { getFileNameFromUrl, removeQueryParamsFromURl } from './formatters';
import objectHash from 'object-hash';

export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export const isDir = (
    file: GitHubTreeItem | GitHubGitTreeItem | GithubTreeMenuItem
) => file.type === (GitHubTreeItemType.Dir as string) || file.type === 'tree';

export const isFile = (
    file: GitHubTreeItem | GitHubGitTreeItem | GithubTreeMenuItem
) => file.type === (GitHubTreeItemType.File as string) || !isDir(file);

export const hashGitHubItem = (
    item: GitHubTreeItem | GitHubGitTreeItem | GithubTreeMenuItem
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

export const parentRootKey = 'root';
export function buildIndexedGitHubTree(tree: GitHubGitTreeItem[]) {
    const result = new Map<string, GithubTreeMenuItem>();
    const menuTree: GithubTreeMenuItem[] = [];
    tree.forEach((item) => {
        const pathParts = item.path.split('/').filter(Boolean);
        pathParts.pop();

        const searchParentPath = pathParts.join('/');
        const parentItem = result.get(searchParentPath);

        hashGitHubItem(item);
        const newItem: GithubTreeMenuItem = {
            ...item,
            name: getFileNameFromUrl(item.path),
            tree: [],
            children: 0,
            isTopLevel: pathParts.length === 0,
            isRoot: false,
        };

        if (parentItem) {
            parentItem.children++;
            parentItem.tree.push(newItem);
        }

        result.set(item.path, newItem);

        if (newItem.isTopLevel) {
            menuTree.push(newItem);
        }
    });

    // Add the root item to the result.
    result.set(parentRootKey, {
        unique_key: parentRootKey,
        path: '',
        name: 'Root',
        type: GitHubTreeItemType.Dir,
        sha: parentRootKey,
        size: 0,
        mode: '',
        url: '',
        children: menuTree.length,
        isTopLevel: true,
        isRoot: true,
        tree: [],
    });

    return {
        items: result,
        menuTree,
    };
}

export const buildParentTreeForSearchPath = (
    searchPath: string,
    indexedItems: Map<string, GithubTreeMenuItem>
): GitHubTreeParentItem[] => {
    const result: GitHubTreeParentItem[] = [];

    // Build the result array by traversing the search path parts
    const searchPathParts = removeQueryParamsFromURl(searchPath)
        .split('/')
        .filter(Boolean);
    while (searchPathParts.length > 0) {
        const currentPath = searchPathParts.join('/');
        const item = indexedItems.get(currentPath);
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

    // Add the root item to the result.
    const rootItem = indexedItems.get(parentRootKey);
    if (rootItem) {
        result.push({
            unique_key: parentRootKey,
            name: rootItem.path,
            children: rootItem.children,
        });
    }

    return result;
};
