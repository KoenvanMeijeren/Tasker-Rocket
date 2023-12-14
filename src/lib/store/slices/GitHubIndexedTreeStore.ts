import { makeAutoObservable } from 'mobx';
import { GithubTreeMenuItem } from '@/types/gitHubData';

export class GitHubIndexedTreeStore {
    public items: Map<string, GithubTreeMenuItem> = new Map();

    public menuItems: GithubTreeMenuItem[] = [];

    public constructor() {
        makeAutoObservable(this);
    }

    public initialize(
        items: Map<string, GithubTreeMenuItem>,
        menuTree: GithubTreeMenuItem[]
    ) {
        this.items = items;
        this.menuItems = menuTree;
    }
}
