import { makeAutoObservable } from 'mobx';
import { GithubTreeMenuItem } from '@/types/gitHubData';
import { makeSlicePersistable } from '@/lib/store/hooks';

export class GitHubMenuTreeStore {
    public items: GithubTreeMenuItem[] = [];

    public itemsActive: Record<string, boolean> = {};

    public openedFilePath: string = '';

    public constructor() {
        makeAutoObservable(this);
        void makeSlicePersistable(this, 'gitHubMenuTreeState', [
            'itemsActive',
            'openedFilePath',
        ]);
    }

    public initialize(items: GithubTreeMenuItem[]) {
        this.items = items;
    }

    public toggleItemState(item: GithubTreeMenuItem) {
        const newState = !this.itemsActive[item.unique_key];
        this.itemsActive[item.unique_key] = newState;

        // If we are closing the item, we need to close all its subitems.
        if (!newState) return;

        item.tree.forEach((subItem) => {
            this.itemsActive[subItem.unique_key] = false;
        });
    }

    public isItemActive(item: GithubTreeMenuItem) {
        return this.itemsActive[item.unique_key] ?? false;
    }

    public setOpenedFilePath(filePath: string) {
        this.openedFilePath = filePath;
    }

    public isFileOpened(filePath: string | undefined) {
        return this.openedFilePath === filePath;
    }
}
