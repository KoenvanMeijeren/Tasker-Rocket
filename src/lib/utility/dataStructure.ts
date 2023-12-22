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

export function buildMenuTree(tree: GitHubGitTreeItem[]) {
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

    return menuTree;
}

export const parentRootKey = 'root';
export const buildParentTreeForSearchPath = (
    inputSearchPath: string,
    menuTree: GithubTreeMenuItem[]
): GitHubTreeParentItem[] => {
    const result: GitHubTreeParentItem[] = [];

    // When we don't have a tree, we assume that the root is the parent.
    if (menuTree.length < 1) {
        result.push({
            unique_key: parentRootKey,
            name: 'root',
            children: menuTree.length,
        });
        return result;
    }

    const searchPathParts = removeQueryParamsFromURl(inputSearchPath)
        .split('/')
        .filter(Boolean);

    let currentTree = menuTree;

    let searchPath = '';
    const firstItem = searchPathParts[0];
    for (const searchPathPart of searchPathParts) {
        if (searchPathPart !== firstItem) {
            searchPath += '/';
        }
        searchPath += searchPathPart;

        // Avoid unsafe references to the search path variable in the find current item closure.
        const currentSearchPath = searchPath;
        const currentItem = currentTree.find(
            (item) => item.path === currentSearchPath
        );
        if (!currentItem) {
            throw new Error(
                `Could not find item for given search path in tree: ${searchPath}`
            );
        }

        result.unshift({
            unique_key: currentItem.unique_key,
            name: currentItem.name,
            children: currentItem.children,
        });

        currentTree = currentItem.tree || [];
    }

    // Add the root item to the result.
    result.push({
        unique_key: parentRootKey,
        name: 'root',
        children: menuTree.length,
    });

    return result;
};
