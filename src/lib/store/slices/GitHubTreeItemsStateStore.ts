import { makeAutoObservable } from 'mobx';
import { GitHubTreeParentItem } from '@/types/gitHubData';

export interface GitHubTreeItemsState {
    [parentKey: string]: {
        children: number;
        completedChildren: {
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
    }

    /**
     * Initializes the tree with the given parentKey and children.
     *
     * It is important to call this method ASAP while traversing the tree.
     * This method will ensure that the parentKey exists in the state and
     * initialize it with the given children. This method should be called
     * before calling toggleCompletedInTree.
     *
     * Example result:
     * "57b7e7f2733dc4c415cc118b3fdb836102466cd4": {
     *   "children": 2,
     *   "completedChildren": {}
     * },
     * "root": {
     *   "children": 1,
     *   "completedChildren": {}
     * }
     */
    public initTree(payload: GitHubTreeParentItem) {
        const { unique_key: parentKey, children } = payload;
        if (!parentKey) {
            throw new Error(
                'initTree reducer called without a valid parentKey.'
            );
        }

        // Ensure the parentKey exists in the state
        if (!this.state[parentKey]) {
            this.state[parentKey] = {
                children: children,
                completedChildren: {},
            };
            return;
        }

        this.state[parentKey].children = children;
    }

    /**
     * Toggles the completed state for the itemKey under the parentKey and
     * all parentKeys up to the root.
     *
     * Example state before calling toggleCompleted:
     * "57b7e7f2733dc4c415cc118b3fdb836102466cd4": {
     *   "children": 2,
     *   "completedChildren": {
     *     "651f9948adfec902ae496f8edd570edd41bab904": true,
     *     "cf5ea7d6ef89cfdcf95457cf92c65ad162986db3": false
     *   }
     * },
     * "0dc9b4dfc65102978682bd1a4dfa6870633f2741": {
     *   "children": 1,
     *   "completedChildren": {
     *     "57b7e7f2733dc4c415cc118b3fdb836102466cd4": false
     *   }
     * },
     * "root": {
     *   "children": 1,
     *   "completedChildren": {
     *     "0dc9b4dfc65102978682bd1a4dfa6870633f2741": false,
     *   }
     * }
     *
     * Example result:
     * "57b7e7f2733dc4c415cc118b3fdb836102466cd4": {
     *   "children": 2,
     *   "completedChildren": {
     *     "651f9948adfec902ae496f8edd570edd41bab904": true,
     *     "cf5ea7d6ef89cfdcf95457cf92c65ad162986db3": true
     *   }
     * },
     * "0dc9b4dfc65102978682bd1a4dfa6870633f2741": {
     *   "children": 1,
     *   "completedChildren": {
     *     "57b7e7f2733dc4c415cc118b3fdb836102466cd4": true
     *   }
     * },
     * "root": {
     *   "children": 1,
     *   "completedChildren": {
     *     "0dc9b4dfc65102978682bd1a4dfa6870633f2741": true,
     *   }
     * }
     */
    public toggleCompletedInTree(payload: {
        parentTree: GitHubTreeParentItem[];
        parentKey: string;
        itemKey: string;
    }) {
        const { parentTree, parentKey, itemKey } = payload;

        this.toggleCompletedInternal(parentKey, itemKey);

        let nextParentTreeItem: GitHubTreeParentItem | null = null;
        let nextParentTreeItemIndex = 1;
        parentTree.forEach((parentTreeItem) => {
            nextParentTreeItem = parentTree[nextParentTreeItemIndex] ?? null;
            nextParentTreeItemIndex++;
            if (!nextParentTreeItem) return;

            this.setFolderCompletedInternal(
                nextParentTreeItem.unique_key,
                parentTreeItem.unique_key
            );
        });
    }

    /**
     * Toggles the completed state for the itemKey under the parentKey.
     *
     * Example state before calling toggleCompleted:
     * "57b7e7f2733dc4c415cc118b3fdb836102466cd4": {
     *   "children": 2,
     *   "completedChildren": {
     *     "651f9948adfec902ae496f8edd570edd41bab904": true,
     *     "cf5ea7d6ef89cfdcf95457cf92c65ad162986db3": false
     *   }
     * },
     * "root": {
     *   "children": 1,
     *   "completedChildren": {
     *     "57b7e7f2733dc4c415cc118b3fdb836102466cd4": false,
     *   }
     * }
     *
     * Example result:
     * "57b7e7f2733dc4c415cc118b3fdb836102466cd4": {
     *   "children": 2,
     *   "completedChildren": {
     *     "651f9948adfec902ae496f8edd570edd41bab904": true,
     *     "cf5ea7d6ef89cfdcf95457cf92c65ad162986db3": true
     *   }
     * },
     * "root": {
     *   "children": 1,
     *   "completedChildren": {
     *     "57b7e7f2733dc4c415cc118b3fdb836102466cd4": false,
     *   }
     * }
     */
    public toggleCompleted(payload: { parentKey: string; itemKey: string }) {
        const { parentKey, itemKey } = payload;
        this.toggleCompletedInternal(parentKey, itemKey);
    }

    public isCompleted = (parentKey: string, itemKey: string): boolean => {
        if (!this.state[parentKey]) {
            return false;
        }

        return this.state[parentKey].completedChildren[itemKey];
    };

    public isFolderCompleted = (parentKey: string): boolean => {
        const parent = this.state[parentKey];
        if (!parent) {
            return false;
        }

        const completedChildren = Object.values(
            parent.completedChildren
        ).filter((isCompleted) => isCompleted);

        return completedChildren.length === parent.children;
    };

    /**
     * Toggles the completed state for the itemKey under the parentKey.
     */
    private toggleCompletedInternal = (parentKey: string, itemKey: string) => {
        // Ensure the parentKey exists in the state
        if (!this.state[parentKey]) {
            this.state[parentKey] = {
                children: 0,
                completedChildren: {},
            };
        }

        // Toggle the completed state for the specific itemKey under the parentKey
        this.state[parentKey].completedChildren[itemKey] = !this.isCompleted(
            parentKey,
            itemKey
        );
    };

    /**
     * Sets the completed state of the folder for the itemKey under the parentKey.
     */
    private setFolderCompletedInternal = (
        parentKey: string,
        itemKey: string
    ) => {
        // Ensure the parentKey exists in the state
        if (!this.state[parentKey]) {
            this.state[parentKey] = {
                children: 0,
                completedChildren: {},
            };
        }

        // Sets the completed state for the specific itemKey under the parentKey
        this.state[parentKey].completedChildren[itemKey] =
            this.isFolderCompleted(itemKey);
    };
}
