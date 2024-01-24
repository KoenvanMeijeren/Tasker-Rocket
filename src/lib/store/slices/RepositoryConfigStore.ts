import { makeAutoObservable } from 'mobx';
import { makeSlicePersistable } from '../hooks';
import { EnvOptions, getEnvValue, isEnvValueEnabled } from '@/lib/utility/env';

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
        void makeSlicePersistable(this, 'repositoryConfig', ['items']);
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
}
