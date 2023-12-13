import { makeAutoObservable } from 'mobx';
import { GitHubTreeParentItem } from '@/types/gitHubData';
import { makeSlicePersistable } from '@/lib/store/hooks';

export interface GitHubTreeItemsState {
    [parentKey: string]: {
        children: number;
        childrenStatus: {
            [taskKey: string]: boolean;
        };
    };
}

/**
 * This store is used to keep track of the completed state of the GitHub tree.
 */
export class GitHubTreeItemsStateStore {
    public state: GitHubTreeItemsState = {};

    constructor() {
        makeAutoObservable(this);
        makeSlicePersistable(this, 'gitHubTreeItemsState', ['state']);
    }

    public initState(data: GitHubTreeItemsState) {
        // init state
        this.state = data;
    }

    /**
     * Initializes the tree with the given parentKey and children.s
     *
     * It is important to call this method ASAP while traversing the tree.
     * This method will ensure that the parentKey exists in the state and
     * initialize it with the given children. This method should be called
     * before calling toggleCompletedInTree.
     */
    public initTree(payload: GitHubTreeParentItem) {
        const { unique_key: parentKey, children } = payload;
        if (!parentKey) {
            throw new Error('initTree called without a valid parentKey.');
        }

        // Ensure the parentKey exists in the state
        if (!this.state[parentKey]) {
            this.state[parentKey] = {
                children: children,
                childrenStatus: {},
            };
            return;
        }

        this.state[parentKey].children = children;
    }

    /**
     * Toggles the completed state for the itemKey under the parentKey and
     * all parentKeys up to the root.
     */
    public toggleCompletedInTree(payload: {
        parentTree: GitHubTreeParentItem[];
        parentKey: string;
        itemKey: string;
    }) {
        const { parentTree, parentKey, itemKey } = payload;

        this.toggleCompleted(parentKey, itemKey);

        let nextParentTreeItem: GitHubTreeParentItem | null = null;
        parentTree.forEach((parentTreeItem, index) => {
            nextParentTreeItem = parentTree[index + 1] || null;
            if (!nextParentTreeItem) return;

            this.setFolderCompleted(
                nextParentTreeItem.unique_key,
                parentTreeItem.unique_key
            );
        });
    }

    public isCompleted = (parentKey: string, itemKey: string): boolean => {
        return this.state[parentKey]?.childrenStatus[itemKey];
    };

    public isFolderCompleted = (parentKey: string): boolean => {
        const parent = this.state[parentKey];
        if (!parent) return false;

        const completedChildren = Object.values(parent.childrenStatus).filter(
            (isCompleted) => isCompleted
        );

        return completedChildren.length === parent.children;
    };

    /**
     * Toggles the completed state for the itemKey under the parentKey.
     */
    private toggleCompleted = (parentKey: string, itemKey: string) => {
        // Ensure the parentKey exists in the state
        if (!this.state[parentKey]) {
            this.state[parentKey] = {
                children: 0,
                childrenStatus: {},
            };
        }

        // Toggle the completed state for the specific itemKey under the parentKey
        this.state[parentKey].childrenStatus[itemKey] = !this.isCompleted(
            parentKey,
            itemKey
        );
    };

    /**
     * Sets the completed state of the folder for the item under the parent.
     */
    private setFolderCompleted = (parentKey: string, itemKey: string) => {
        // Ensure the parentKey exists in the state
        if (!this.state[parentKey]) {
            this.state[parentKey] = {
                children: 0,
                childrenStatus: {},
            };
        }

        // Sets the completed state for the specific itemKey under the parentKey
        this.state[parentKey].childrenStatus[itemKey] =
            this.isFolderCompleted(itemKey);
    };
}
