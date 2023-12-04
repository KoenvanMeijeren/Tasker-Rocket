import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { useContext } from 'react';
import { SessionContext } from '@/providers/SessionProvider';
import Login from '@/components/auth/Login';

export default function Home() {
    const { data, error, isLoading } = useGitHubContentTree('');
    const { session } = useContext(SessionContext);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    if (!session) return <Login />;
    return (
        <ProjectView currentParent={undefined} data={data} parentTree={[]} />
    );
}
