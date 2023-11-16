import { GithubContent, GitHubTreeItemType } from '@/types/githubTreeItemType';
import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import objectHash from 'object-hash';

export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export const isFile = (file: GitHubTreeItem) =>
    file.type === (GitHubTreeItemType.File as string);

export const isDir = (file: GitHubTreeItem) =>
    file.type === (GitHubTreeItemType.Dir as string);

export const hashGitHubItem = (item: GitHubTreeItem) => {
    item.unique_key = objectHash({
        name: item.name,
        path: item.path,
        url: item.url,
        type: item.type,
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
        data: {
            name: string;
            unique_key: string;
        };
        children: number;
    };
}

export const parentRootKey = 'root';
export const convertParentTreeDataToIndexedDataByPath = (
    parentTreeData: GitHubTreeItem[][]
): GitHubIndexedData => {
    const indexedDataByPath: GitHubIndexedData = {};
    let previousChildren = 0;

    parentTreeData.forEach((treeItems) => {
        treeItems.forEach((subItem) => {
            hashGitHubItem(subItem);
            indexedDataByPath[subItem.path] = {
                data: {
                    name: subItem.name,
                    unique_key: subItem.unique_key ?? '',
                },
                children: previousChildren,
            };
        });

        previousChildren = treeItems.length;
    });

    // Add the last/root item manually, as it is not included in the data.
    indexedDataByPath.root = {
        data: {
            name: 'Root',
            unique_key: parentRootKey,
        },
        children: parentTreeData[parentTreeData.length - 1].length,
    };

    return indexedDataByPath;
};

export const buildParentTreeForCurrentPath = (
    searchPath: string,
    parentTreeData: GitHubTreeItem[][]
): GitHubTreeParentItem[] => {
    const result: GitHubTreeParentItem[] = [];
    const indexedDataByPath =
        convertParentTreeDataToIndexedDataByPath(parentTreeData);

    // Build the result array by traversing the search path parts
    const searchPathParts = searchPath.split('/').filter(Boolean);
    while (searchPathParts.length > 0) {
        const currentPath = searchPathParts.join('/');
        const item = indexedDataByPath[currentPath];
        searchPathParts.pop();
        if (!item) {
            return [];
        }

        const { data, children } = item;

        result.push({
            unique_key: data.unique_key,
            name: data.name,
            children: children,
        });
    }

    // Add the root item to the result array
    result.push({
        unique_key: parentRootKey,
        name: 'Root',
        children: parentTreeData[parentTreeData.length - 1].length,
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
