import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useParentTree } from '@/lib/project/useParentTree';
import { useCurrentPath } from '@/lib/utility/uri';

export default function Home() {
    const openedFileName = useOpenedFileName();
    const { data, error, isLoading } = useGitHubTreeWithContent('');
    const { isEmptyServerPath } = useCurrentPath();
    const parentTree = useParentTree();

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data || !parentTree || isEmptyServerPath) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data}
            openedFileName={openedFileName}
            parentTree={parentTree}
        />
    );
}
