import { makePersistable } from 'mobx-persist-store';
import localforage from 'localforage';

export function makeSlicePersistable(
    object: object,
    name: string,
    properties: string[]
): void {
    // Make the state persistable.
    localforage
        .setDriver(localforage.INDEXEDDB)
        .then(() => {
            makePersistable(object, {
                name: name,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                properties: properties,
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
