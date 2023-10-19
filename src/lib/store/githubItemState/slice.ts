// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type GitHubTreeItemState = {
	key: string;
	completed: boolean;
};

export interface GitHubTreeItemsState {
	items: { [key: string]: boolean };
}

export const gitHubTreeItemsStateSlice = createSlice({
	name: 'itemsState',
	initialState: {
		items: {},
	} as GitHubTreeItemsState,
	reducers: {
		changeState(state, action: PayloadAction<GitHubTreeItemState>) {
			const { key, completed } = action.payload;

			state.items[key] = completed;
		},
	},
});

export const gitHubTreeItemsActions = gitHubTreeItemsStateSlice.actions;
