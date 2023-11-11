import localStorage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import { gitHubTreeItemsSlice } from '@/lib/redux/slices/githubTreeItemsSlice';

const persistConfig: PersistConfig<unknown> = {
    key: 'root',
    storage: localStorage,
    version: 1,
};

export const rootReducer = combineReducers({
    gitHubItems: gitHubTreeItemsSlice.reducer,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistedStore = persistStore(store);

export { store, persistedStore };
