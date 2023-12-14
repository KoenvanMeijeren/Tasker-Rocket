import { GitHubTreeItemsStateStore } from '@/lib/store/slices/GitHubTreeItemsStateStore';

export class MobxStore {
    public readonly gitHubItems: GitHubTreeItemsStateStore;

    constructor() {
        this.gitHubItems = new GitHubTreeItemsStateStore();
    }
}
