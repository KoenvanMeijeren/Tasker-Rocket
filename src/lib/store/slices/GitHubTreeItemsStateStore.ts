import { makeAutoObservable } from 'mobx';
import { GitHubTreeParentItem } from '@/types/gitHubData';
import { makePersistable } from 'mobx-persist-store';
import localforage from 'localforage';

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

        // Make the state persistable.
        localforage
            .setDriver(localforage.INDEXEDDB)
            .then(() => {
                makePersistable(this, {
                    name: 'gitHubTreeItemsState',
                    properties: ['state'],
                    removeOnExpiration: false,
                    storage: localforage,
                })
                    .then(() => {
                        // Manually process the promise to silence errors on
                        // server side.
                    })
                    .catch(() => {
                        // Silence errors on server side, because localforage is
                        // not available there.
                    });
            })
            .catch(() => {
                // Silence errors on server side, because localforage is not
                // available there.
            });
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
            throw new Error('initTree called without a valid parentKey.');
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
        return this.state[parentKey]?.completedChildren[itemKey];
    };

    public isFolderCompleted = (parentKey: string): boolean => {
        const parent = this.state[parentKey];
        if (!parent) return false;

        const completedChildren = Object.values(
            parent.completedChildren
        ).filter((isCompleted) => isCompleted);

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
     * Sets the completed state of the folder for the item under the parent.
     */
    private setFolderCompleted = (parentKey: string, itemKey: string) => {
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
