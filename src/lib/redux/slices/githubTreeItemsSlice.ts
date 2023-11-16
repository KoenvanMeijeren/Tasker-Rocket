// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GitHubTreeParentItem } from '@/types/gitHubData';

export interface GitHubTreeItemsState {
    [parentKey: string]: {
        children: number;
        completedChildren: {
            [taskKey: string]: boolean;
        };
    };
}

export const isGitHubTreeItemCompleted = (
    state: GitHubTreeItemsState,
    parentKey: string,
    itemKey: string
): boolean => {
    if (!state[parentKey]) {
        return false;
    }

    return state[parentKey].completedChildren[itemKey];
};

export const isGitHubTreeFolderCompleted = (
    state: GitHubTreeItemsState,
    parentKey: string
): boolean => {
    const parent = state[parentKey];
    if (!parent) {
        return false;
    }

    const completedChildren = Object.values(parent.completedChildren).filter(
        (isCompleted) => isCompleted
    );

    return completedChildren.length === parent.children;
};

const toggleCompletedInternal = (
    state: GitHubTreeItemsState,
    parentKey: string,
    itemKey: string
) => {
    // Ensure the parentKey exists in the state
    if (!state[parentKey]) {
        state[parentKey].completedChildren = {};
    }

    // Toggle the completed state for the specific itemKey under the parentKey
    state[parentKey].completedChildren[itemKey] = !isGitHubTreeItemCompleted(
        state,
        parentKey,
        itemKey
    );
};

const setFolderCompletedInternal = (
    state: GitHubTreeItemsState,
    parentKey: string,
    itemKey: string
) => {
    // Ensure the parentKey exists in the state
    if (!state[parentKey]) {
        state[parentKey].completedChildren = {};
    }

    // Sets the completed state for the specific itemKey under the parentKey
    state[parentKey].completedChildren[itemKey] = isGitHubTreeFolderCompleted(
        state,
        itemKey
    );
};

export const gitHubTreeItemsSlice = createSlice({
    name: 'gitHubItems',
    initialState: {} as GitHubTreeItemsState,
    reducers: {
        initTree(
            state: GitHubTreeItemsState,
            action: PayloadAction<GitHubTreeParentItem>
        ) {
            const { unique_key: parentKey, children } = action.payload;
            if (!parentKey) return;

            // Ensure the parentKey exists in the state
            if (!state[parentKey]) {
                state[parentKey] = {
                    children: children,
                    completedChildren: {},
                };
                return;
            }

            state[parentKey].children = children;
        },

        toggleCompletedInTree(
            state: GitHubTreeItemsState,
            action: PayloadAction<{
                parentTree: GitHubTreeParentItem[];
                parentKey: string;
                itemKey: string;
            }>
        ) {
            const { parentTree, parentKey, itemKey } = action.payload;

            toggleCompletedInternal(state, parentKey, itemKey);

            let nextParentTreeItem: GitHubTreeParentItem | null = null;
            let nextParentTreeItemIndex = 1;
            parentTree.forEach((parentTreeItem) => {
                nextParentTreeItem =
                    parentTree[nextParentTreeItemIndex] ?? null;
                nextParentTreeItemIndex++;
                if (!nextParentTreeItem) return;

                setFolderCompletedInternal(
                    state,
                    nextParentTreeItem.unique_key,
                    parentTreeItem.unique_key
                );
            });
        },

        toggleCompleted(
            state: GitHubTreeItemsState,
            action: PayloadAction<{
                parentKey: string;
                itemKey: string;
            }>
        ) {
            const { parentKey, itemKey } = action.payload;
            toggleCompletedInternal(state, parentKey, itemKey);
        },
    },
});

export const gitHubTreeItemsActions = gitHubTreeItemsSlice.actions;
