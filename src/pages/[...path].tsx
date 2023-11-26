'use client';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ProjectView } from '@/components/ProjectView';
import { GitHubTreeItem } from '@/types/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';

export default function ProjectContent() {
    const router = useRouter();
    const path = decodeURIComponent(router.asPath);
    const parent = path.split('/').pop();

    // Check if window is defined (client side code)
    const repositoryName =
        typeof window !== 'undefined'
            ? localStorage.getItem('repositoryName') ?? undefined
            : undefined;

    const { data, error, isLoading } = useGitHubContentTree(
        decodeURIComponent(path),
        repositoryName
    );

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView data={data as GitHubTreeItem[]} parent={parent || ''} />
    );
}