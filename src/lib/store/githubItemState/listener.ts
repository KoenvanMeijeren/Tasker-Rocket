import { gitHubTreeItemsActions } from './slice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Unsubscribe } from '@reduxjs/toolkit';
import { AppStartListening } from '@/lib/store/store';

export function setupGitHubItemStateListeners(
	startListening: AppStartListening,
): Unsubscribe {
	const listeners = [
		startListening({
			actionCreator: gitHubTreeItemsActions.toggleCompleted,
			effect: () => {},
		}),
	];

	return () => listeners.forEach((unsubscribe) => unsubscribe());
}
