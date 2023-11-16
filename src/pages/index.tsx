import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';

export default function Home() {
    const { data, error, isLoading } = useGitHubContentTree('');

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView currentParent={undefined} data={data} parentTree={[]} />
    );
}
