import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ProjectView } from '@/components/ProjectView';
import ErrorCard from '@/components/error/ErrorCard';
import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';

export default function Home() {
	const { data, error, isLoading } = useGitHubContentRootTree();

	if (error) {
		return ErrorCard(error.message);
	}

	if (isLoading || !data) {
		return <LoadingIndicator />;
	}

	return <ProjectView data={data} parent={undefined} />;
}
