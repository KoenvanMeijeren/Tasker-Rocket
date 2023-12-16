import { makePersistable } from 'mobx-persist-store';

export async function makeSlicePersistable(
    object: object,
    name: string,
    properties: string[]
) {
    if (typeof window === 'undefined') return;

    await makePersistable(object, {
        name: name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        properties: properties,
        removeOnExpiration: false,
        storage: window.localStorage,
    });
}
