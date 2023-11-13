import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ProjectView } from '@/components/ProjectView';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { useSearchParams } from 'next/navigation';

export default function Home() {
    const { data, error, isLoading } = useGitHubContentTree('');
    const searchParams = useSearchParams();
    const openedFile = searchParams.get('file');
    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }
    return <ProjectView data={data} openedFile={openedFile} parent="" />;
}
