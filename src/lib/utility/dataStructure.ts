import { GithubTreeMenuItem } from '@/components/navigation/sideBar/SideBar';
import { GitHubTreeItem } from '@/types/gitHubData';
import { GitHubTreeItemType, GithubContent } from '@/types/githubTreeItemType';
import { getFileNameFromUrl, getParentFromUrl } from './formatters';

export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export const isFile = (file: GitHubTreeItem) =>
    file.type === (GitHubTreeItemType.File as string);

export const isDir = (file: GitHubTreeItem) =>
    file.type === (GitHubTreeItemType.Dir as string);

export const splitFilesAndDirs = (data: GitHubTreeItem[]) => {
    const dirs: GitHubTreeItem[] = [];
    const files: GitHubTreeItem[] = [];
    data.forEach((item) => {
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
        map.set(item.path, {
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
        const curr = map.get(item.path);
        if (!parent || !curr) throw new Error('parent or curr is undefined');
        parent.tree.push(curr);
    });

    const rootItems = tree.filter((item) => !item.path.includes('/'));
    return rootItems.map((item) => {
        const treeItem = map.get(item.path);
        if (!treeItem) throw new Error('item is undefined');
        return treeItem;
    });
}
