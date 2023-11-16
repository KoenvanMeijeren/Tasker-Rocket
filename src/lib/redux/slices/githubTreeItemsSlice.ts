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

    const completedChildren = Object.values(parent.completedChildren);

    return completedChildren.length === parent.children;
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

        toggleCompleted(
            state: GitHubTreeItemsState,
            action: PayloadAction<{
                parentKey: string;
                itemKey: string;
            }>
        ) {
            const { parentKey, itemKey } = action.payload;

            // Ensure the parentKey exists in the state
            if (!state[parentKey]) {
                state[parentKey].completedChildren = {};
            }

            // Update the completed state for the specific itemKey under the parentKey
            state[parentKey].completedChildren[itemKey] =
                !isGitHubTreeItemCompleted(state, parentKey, itemKey);
        },
    },
});

export const gitHubTreeItemsActions = gitHubTreeItemsSlice.actions;
