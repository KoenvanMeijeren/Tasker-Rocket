import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';

export default function Home() {
    const openedFileName = useOpenedFileName();
    const { data, error, isLoading } = useGitHubContentTree('');

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return <ProjectView data={data} openedFileName={openedFileName} />;
}
