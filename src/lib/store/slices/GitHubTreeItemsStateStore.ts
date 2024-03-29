import { makeAutoObservable } from 'mobx';
import { GithubTreeMenuItem, GitHubTreeParentItem } from '@/types/gitHubData';
import { makeSlicePersistable } from '@/lib/store/hooks';
import { isDir } from '@/lib/utility/dataStructure';

export interface GitHubTreeItemsState {
    repositories: {
        [repository: string]: {
            tree: {
                [parentKey: string]: {
                    children: number;
                    childrenStatus: {
                        [taskKey: string]: boolean;
                    };
                };
            };
        };
    };
}

export class GitHubTreeItemsStateStore {
    public state: GitHubTreeItemsState = {
        repositories: {},
    };

    constructor() {
        makeAutoObservable(this);
        void makeSlicePersistable(this, 'gitHubTreeItemsState', ['state']);
    }

    public initRepository(repository: string) {
        if (!this.state.repositories[repository]) {
            this.state.repositories[repository] = { tree: {} };
        }
    }

    public initTree(repository: string, items: GithubTreeMenuItem[]) {
        this.initRepository(repository);

        const { tree } = this.state.repositories[repository];
        items.forEach((item) => {
            if (!isDir(item)) return;

            const { unique_key: uniqueKey, tree: treeItems } = item;
            if (!uniqueKey || uniqueKey.length < 1) {
                throw new Error('initTree called without a valid unique key.');
            }

            tree[uniqueKey] = {
                children: treeItems.length,
                childrenStatus: tree[uniqueKey]?.childrenStatus || {},
            };

            // Recursively initialize the tree, because we are dealing with a menu tree.
            this.initTree(repository, item.tree);
        });
    }

    public toggleCompletedInTree(
        repository: string,
        parentTree: GitHubTreeParentItem[],
        parentKey: string,
        itemKey: string
    ) {
        this.assertRepositoryExists(repository);
        this.toggleCompleted(repository, parentKey, itemKey);

        let nextParentTreeItem: GitHubTreeParentItem | null = null;
        parentTree.forEach((parentTreeItem, index) => {
            nextParentTreeItem = parentTree[index + 1] || null;
            if (!nextParentTreeItem) return;

            this.updateFolderCompletedState(
                repository,
                nextParentTreeItem.unique_key,
                parentTreeItem.unique_key
            );
        });
    }

    public isCompleted = (
        repository: string,
        parentKey: string,
        itemKey: string
    ): boolean => {
        this.assertRepositoryExists(repository);
        const { tree } = this.state.repositories[repository];
        return tree[parentKey]?.childrenStatus[itemKey];
    };

    public isFolderCompleted = (
        repository: string,
        parentKey: string
    ): boolean => {
        this.assertRepositoryExists(repository);
        const { tree } = this.state.repositories[repository];
        const parent = tree[parentKey] ?? null;
        if (!parent) return false;

        const completedChildren = Object.values(parent.childrenStatus).filter(
            (isCompleted) => isCompleted
        );

        return completedChildren.length === parent.children;
    };

    private toggleCompleted = (
        repository: string,
        parentKey: string,
        itemKey: string
    ) => {
        this.assertRepositoryExists(repository);
        const { tree } = this.state.repositories[repository];
        if (!tree[parentKey]) {
            tree[parentKey] = {
                children: 0,
                childrenStatus: {},
            };
        }

        tree[parentKey].childrenStatus[itemKey] = !this.isCompleted(
            repository,
            parentKey,
            itemKey
        );
    };

    private updateFolderCompletedState = (
        repository: string,
        parentKey: string,
        itemKey: string
    ) => {
        this.assertRepositoryExists(repository);
        const { tree } = this.state.repositories[repository];
        if (!tree[parentKey]) {
            tree[parentKey] = {
                children: 0,
                childrenStatus: {},
            };
        }

        tree[parentKey].childrenStatus[itemKey] = this.isFolderCompleted(
            repository,
            itemKey
        );
    };

    private assertRepositoryExists(repository: string) {
        if (!this.state.repositories[repository]) {
            throw new Error(
                `Repository ${repository} does not exist in the tree.`
            );
        }
    }
}
