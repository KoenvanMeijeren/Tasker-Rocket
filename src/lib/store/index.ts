// we need to enable static rendering for prevent rerender on server side and leaking memory
import { enableStaticRendering } from 'mobx-react-lite';
import { MobxStore } from '@/lib/store/MobxStore';
import { useMemo } from 'react';

// enable static rendering ONLY on server
enableStaticRendering(typeof window === 'undefined');

// init a client store that we will send to client (one store for client)
let clientStore: MobxStore | null = null;

export const initStore = () => {
    if (typeof window === 'undefined') {
        // Create a new store on every server request
        return new MobxStore();
    }

    // On the client side, return the existing store if it exists.
    // This will create only one store for the client. It also does
    // not create a new store on each use of the hook. Because of
    // the caching mechanism by declaring the variable above.
    if (!clientStore) {
        clientStore = new MobxStore();
    }

    return clientStore;
};

export function useStore() {
    return useMemo(() => initStore(), []);
}
