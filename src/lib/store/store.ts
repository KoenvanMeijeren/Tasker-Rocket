import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
    configureStore,
    createListenerMiddleware,
    TypedStartListening,
    TypedAddListener,
    ListenerEffectAPI,
    addListener,
} from '@reduxjs/toolkit';
import { gitHubTreeItemsStateSlice } from '@/lib/store/githubItemState/slice';

const listenerMiddlewareInstance = createListenerMiddleware({
    // eslint-disable-next-line no-console
    onError: () => console.error,
});

// convert object to string and store in localStorage
function saveToLocalStorage(state: unknown) {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistentState', serialisedState);
}

// load string from localStorage and convert back in to an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistentState');
        if (serialisedState === null) return undefined;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(serialisedState);
    } catch (e) {
        return undefined;
    }
}

const store = configureStore({
    reducer: {
        [gitHubTreeItemsStateSlice.name]: gitHubTreeItemsStateSlice.reducer,
    },
    preloadedState: loadFromLocalStorage(),
    middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
});

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
    listenerMiddlewareInstance.startListening as AppStartListening;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
