'use client';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ProjectView } from '@/components/ProjectView';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { removeQueryParamsFromURl } from '@/lib/utility/formatters';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function ProjectContent() {
	const router = useRouter();
	const path = removeQueryParamsFromURl(decodeURIComponent(router.asPath));
	const parent = path.split('/').pop();

	const searchParams = useSearchParams();
	const openedFile = searchParams.get('file');

	const { data, error, isLoading } = useGitHubContentTree(path);

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading || !data) {
		return <LoadingIndicator />;
	}

	return (
		<ProjectView
			data={data as GitHubTreeItem[]}
			openedFile={openedFile}
			parent={parent || ''}
		/>
	);
}
