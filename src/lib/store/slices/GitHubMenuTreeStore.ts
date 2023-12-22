import { makeAutoObservable } from 'mobx';
import { GithubTreeMenuItem } from '@/types/gitHubData';

export class GitHubMenuTreeStore {
    public items: GithubTreeMenuItem[] = [];

    public constructor() {
        makeAutoObservable(this);
    }

    public initialize(items: GithubTreeMenuItem[]) {
        this.items = items;
    }
}
