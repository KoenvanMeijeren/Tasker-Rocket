import { GitHubMenuTreeStore } from '@/lib/store/slices/GitHubMenuTreeStore';
import { GitHubTreeItemsStateStore } from '@/lib/store/slices/GitHubTreeItemsStateStore';
import { RepositoryConfigStore } from './slices/RepositoryConfigStore';

export class MobxStore {
    public readonly gitHubItemsState: GitHubTreeItemsStateStore;

    public readonly menuTree: GitHubMenuTreeStore;

    public readonly repositoryConfig: RepositoryConfigStore;

    constructor() {
        this.gitHubItemsState = new GitHubTreeItemsStateStore();
        this.menuTree = new GitHubMenuTreeStore();
        this.repositoryConfig = new RepositoryConfigStore();
    }
}
