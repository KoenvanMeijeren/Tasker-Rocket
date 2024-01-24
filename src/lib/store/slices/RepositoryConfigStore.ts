import { EnvOptions, getEnvValue, isEnvValueEnabled } from '@/lib/utility/env';
import { makeAutoObservable } from 'mobx';
import { makeSlicePersistable } from '../hooks';

export type RepositoryConfigItem = {
    repository: string;
    isPrivate: boolean;
};

export class RepositoryConfigStore {
    public items: RepositoryConfigItem[] = [];

    public selectedItem: RepositoryConfigItem = {
        repository: getEnvValue(EnvOptions.GithubContentRepository),
        isPrivate: isEnvValueEnabled(EnvOptions.GitHubRepositoryIsPrivate),
    };

    constructor() {
        makeAutoObservable(this);
        void makeSlicePersistable(this, 'repositoryConfig', [
            'items',
            'selectedItem',
        ]);
        //add default item to the store so there is always at least one item
        if (this.items.length === 0) {
            this.items.push(this.selectedItem);
        }
    }

    public addRepository(item: RepositoryConfigItem) {
        if (this.items.some((i) => i.repository === item.repository)) {
            throw new Error(`Repository ${item.repository} already exists.`);
        }

        this.items.push(item);
    }

    public removeRepository(item: RepositoryConfigItem) {
        //find index of item
        const index = this.items.findIndex(
            (i) => i.repository === item.repository
        );

        //remove item
        this.items.splice(index, 1);
    }

    public setSelectedItem(item: RepositoryConfigItem) {
        this.selectedItem = item;
    }
}
