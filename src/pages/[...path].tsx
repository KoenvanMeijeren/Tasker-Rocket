'use client';
import { useRouter } from 'next/router';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Content } from '@/components/content/Content';

export default function ProjectContent() {
	const router = useRouter();
	const path = router.asPath

	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path)
	);

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading) {
		return <div>laden...</div>;
	}

	if (!data) {
		return <div>Er kon geen content gevonden worden.</div>;
	}

	return (
		<Content data={data as GitHubTreeItem[]} />
	);
}
