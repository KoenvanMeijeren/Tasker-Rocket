import { Box, Heading } from '@chakra-ui/react';
import { ProjectsOverview } from '@/components/project/ProjectsOverview';
import { Content } from '@/components/Content';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
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
		return <div>Er zijn geen projecten gevonden.</div>;
	}
  return (
        <Content data={data as GitHubTreeItem[]} />
  )
}
