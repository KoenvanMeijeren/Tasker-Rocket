import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useParentTree } from '@/lib/project/useParentTree';
import { useCurrentPath } from '@/lib/utility/uri';
import { useStore } from '@/lib/store';

export default function Home() {
    const store = useStore();
    const { data, error, isLoading } = useGitHubTreeWithContent('');
    const { isEmptyServerPath } = useCurrentPath();
    const parentTree = useParentTree(store);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data || !parentTree || isEmptyServerPath) {
        return <LoadingIndicator />;
    }

    return <ProjectView data={data} parentTree={parentTree} />;
}
