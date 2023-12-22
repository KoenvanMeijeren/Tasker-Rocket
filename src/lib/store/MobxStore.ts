import { GitHubTreeItemsStateStore } from '@/lib/store/slices/GitHubTreeItemsStateStore';
import { GitHubMenuTreeStore } from '@/lib/store/slices/GitHubMenuTreeStore';

export class MobxStore {
    public readonly gitHubItemsState: GitHubTreeItemsStateStore;

    public readonly menuTree: GitHubMenuTreeStore;

    constructor() {
        this.gitHubItemsState = new GitHubTreeItemsStateStore();
        this.menuTree = new GitHubMenuTreeStore();
    }
}
