'use client';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ProjectView } from '@/components/ProjectView';
import { GitHubTreeItem } from '@/types/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';
import ErrorCard from '@/components/error/ErrorCard';

export default function ProjectContent() {
    const router = useRouter();
    const path = decodeURIComponent(router.asPath);
    const parent = path.split('/').pop();

    const { data, error, isLoading } = useGitHubContentTree(
        decodeURIComponent(path)
    );

	if (error) {
		return ErrorCard(error.message);
	}

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView data={data as GitHubTreeItem[]} parent={parent || ''} />
    );
}
