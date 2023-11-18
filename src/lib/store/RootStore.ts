import { GitHubTreeItemsStateStore } from '@/lib/store/slices/GitHubTreeItemsStateStore';

export class RootStore {
    public readonly gitHubItems: GitHubTreeItemsStateStore;

    constructor() {
        this.gitHubItems = new GitHubTreeItemsStateStore();
    }

    public hydrate(data: unknown) {
        // TODO: hydrate store.
    }
}
