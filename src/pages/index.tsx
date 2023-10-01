import { Content } from '@/components/Content';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';

export default function Home() {
	const { data, error, isLoading } = useGitHubContentRootTree();

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading || !data) {
		return <LoadingIndicator />;
	}

	return <Content data={data} />;
}
