import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/types/gitHubData';

export default function Home() {
    const { data, error, isLoading } = useGitHubContentTree('');
    const openedFileName = useOpenedFileName();

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            currentParent={undefined}
            data={data as GitHubTreeItem | GitHubTreeItem[]}
            openedFileName={openedFileName}
            parentTree={[]}
        />
    );
}
