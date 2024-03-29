import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import ProjectView from '@/components/project/ProjectView';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useParentTree } from '@/lib/project/useParentTree';
import { useCurrentPath } from '@/lib/utility/uri';
import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';

const Home = observer(() => {
    const store = useStore();
    const { data, error, isLoading } = useGitHubTreeWithContent(
        '',
        store.repositoryConfig.selectedItem
    );
    const { isEmptyServerPath } = useCurrentPath();
    const parentTree = useParentTree(store);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data || !parentTree || isEmptyServerPath) {
        return <LoadingIndicator />;
    }

    return <ProjectView data={data} parentTree={parentTree} />;
});

Home.displayName = 'Home';
export default Home;
