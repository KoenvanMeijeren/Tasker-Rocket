// we need to enable static rendering for prevent rerender on server side and leaking memory
import { enableStaticRendering } from 'mobx-react-lite';
import { RootStore } from '@/lib/store/RootStore';

// enable static rendering ONLY on server
enableStaticRendering(typeof window === 'undefined');

// init a client store that we will send to client (one store for client)
let clientStore: RootStore | null = null;

const initStore = (initData: unknown) => {
    // check if we already declare store (client Store), otherwise create one
    const store = clientStore ?? new RootStore();
    // hydrate to store if receive initial data
    if (initData) store.hydrate(initData);

    // Create a store on every server request
    if (typeof window === 'undefined') return store;
    // Otherwise it's client, remember this store and return
    if (!clientStore) clientStore = store;
    return store;
};

export function useStore(initData?: unknown) {
    return initStore(initData);
}
