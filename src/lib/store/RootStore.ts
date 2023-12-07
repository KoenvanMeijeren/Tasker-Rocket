import { GitHubTreeItemsStateStore } from '@/lib/store/slices/GitHubTreeItemsStateStore';

export class RootStore {
    public readonly gitHubItems: GitHubTreeItemsStateStore;

    constructor() {
        this.gitHubItems = new GitHubTreeItemsStateStore();
    }
}
