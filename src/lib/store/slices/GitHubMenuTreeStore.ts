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

    public resetActiveItems() {
        this.itemsActive = {};
    }

    public toggleItemState(item: GithubTreeMenuItem) {
        this.itemsActive[item.unique_key] = !this.itemsActive[item.unique_key];

        if (!this.itemsActive[item.unique_key]) {
            this.deactivateItemRecursively(item);
        }
    }

    public deactivateItemRecursively(item: GithubTreeMenuItem) {
        this.itemsActive[item.unique_key] = false;

        item.tree.forEach((subItem) => {
            this.deactivateItemRecursively(subItem);
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
