import { Content } from '@/components/Content';
import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';

export default function Home() {
	const { data, error, isLoading } = useGitHubContentRootTree();

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading) {
		return <div>laden...</div>;
	}

	if (!data) {
		return <div>Er zijn geen projects gevonden.</div>;
	}

	return <Content data={data} />;
}
