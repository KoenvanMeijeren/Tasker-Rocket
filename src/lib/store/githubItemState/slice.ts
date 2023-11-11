// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type GitHubTreeItemToggleCompletedAction = {
	parentKey: string;
	itemKey: string;
};

export interface GitHubTreeItemsState {
	[parentKey: string]: {
		[itemKey: string]: boolean;
	};
}

export const isGitHubTreeItemCompleted = (
	state: GitHubTreeItemsState,
	parentKey: string,
	itemKey: string,
): boolean => {
	if (!state[parentKey]) {
		return false;
	}

	return state[parentKey][itemKey];
};

export const isGitHubTreeFolderCompleted = (
	state: GitHubTreeItemsState,
	parentKey: string,
): boolean => {
	const parent = state[parentKey];

	return parent ? Object.values(parent).every((completed) => completed) : false;
};

export const gitHubTreeItemsStateSlice = createSlice({
	name: 'items',
	initialState: {} as GitHubTreeItemsState,
	reducers: {
		toggleCompleted(
			state: GitHubTreeItemsState,
			action: PayloadAction<GitHubTreeItemToggleCompletedAction>,
		) {
			const { parentKey, itemKey } = action.payload;

			// Ensure the parentKey exists in the state
			if (!state[parentKey]) {
				state[parentKey] = {};
			}

			// Update the completed state for the specific itemKey under the parentKey
			state[parentKey][itemKey] = !isGitHubTreeItemCompleted(
				state,
				parentKey,
				itemKey,
			);
		},
	},
});

export const gitHubTreeItemsActions = gitHubTreeItemsStateSlice.actions;
