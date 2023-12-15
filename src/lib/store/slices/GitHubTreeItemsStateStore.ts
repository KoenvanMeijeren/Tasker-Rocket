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

    public initTree(payload: {
        repository: string;
        items: Map<string, GithubTreeMenuItem>;
    }) {
        const { repository, items } = payload;

        items.forEach((item) => {
            if (!isDir(item)) return;

            const { unique_key: parentKey, children } = item;
            if (!parentKey) {
                throw new Error('initTree called without a valid parentKey.');
            }

            const repositoryState = this.state.repositories[repository];
            if (!repositoryState) {
                this.state.repositories[repository] = {
                    tree: {
                        [parentKey]: {
                            children: children,
                            childrenStatus: {},
                        },
                    },
                };
                return;
            }

            if (!repositoryState.tree[parentKey]) {
                this.state.repositories[repository].tree[parentKey] = {
                    children: children,
                    childrenStatus: {},
                };
                return;
            }

            this.state.repositories[repository].tree[parentKey].children =
                children;
        });
    }

    public toggleCompletedInTree(payload: {
        repository: string;
        parentTree: GitHubTreeParentItem[];
        parentKey: string;
        itemKey: string;
    }) {
        const { repository, parentTree, parentKey, itemKey } = payload;
        this.toggleCompleted(repository, parentKey, itemKey);

        let nextParentTreeItem: GitHubTreeParentItem | null = null;
        parentTree.forEach((parentTreeItem, index) => {
            nextParentTreeItem = parentTree[index + 1] || null;
            if (!nextParentTreeItem) return;

            this.setFolderCompleted(
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
        const repositoryState = this.state.repositories[repository];
        return (
            repositoryState !== undefined &&
            repositoryState.tree[parentKey]?.childrenStatus[itemKey]
        );
    };

    public isFolderCompleted = (
        repository: string,
        parentKey: string
    ): boolean => {
        const repositoryState = this.state.repositories[repository] ?? null;
        if (!repositoryState) return false;

        const parent = repositoryState.tree[parentKey] ?? null;
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
        const repositoryState = this.state.repositories[repository];
        if (!repositoryState) {
            throw new Error(`Repository '${repository}' state not found.`);
        }

        if (!repositoryState.tree[parentKey]) {
            repositoryState.tree[parentKey] = {
                children: 0,
                childrenStatus: {},
            };
        }

        repositoryState.tree[parentKey].childrenStatus[itemKey] =
            !this.isCompleted(repository, parentKey, itemKey);
    };

    private setFolderCompleted = (
        repository: string,
        parentKey: string,
        itemKey: string
    ) => {
        const repositoryState = this.state.repositories[repository];
        if (!repositoryState) {
            throw new Error(`Repository '${repository}' state not found.`);
        }

        if (!repositoryState.tree[parentKey]) {
            repositoryState.tree[parentKey] = {
                children: 0,
                childrenStatus: {},
            };
        }

        repositoryState.tree[parentKey].childrenStatus[itemKey] =
            this.isFolderCompleted(repository, itemKey);
    };
}
