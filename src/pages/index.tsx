import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import ErrorCard from '@/components/error/ErrorCard';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/types/gitHubData';

export default function Home() {
    const { data, error, isLoading } = useGitHubContentTree('');
    const openedFileName = useOpenedFileName();
    if (error) {
        return ErrorCard(error.message);
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }
    return (
        <ProjectView
            data={data as GitHubTreeItem | GitHubTreeItem[]}
            openedFileName={openedFileName}
            parent=""
        />
    );
}
