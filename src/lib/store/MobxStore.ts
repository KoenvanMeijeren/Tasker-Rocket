import { GitHubTreeItemsStateStore } from '@/lib/store/slices/GitHubTreeItemsStateStore';
import { GitHubIndexedTreeStore } from '@/lib/store/slices/GitHubIndexedTreeStore';

export class MobxStore {
    public readonly gitHubItems: GitHubTreeItemsStateStore;

    public readonly indexedTree: GitHubIndexedTreeStore;

    constructor() {
        this.gitHubItems = new GitHubTreeItemsStateStore();
        this.indexedTree = new GitHubIndexedTreeStore();
    }
}
