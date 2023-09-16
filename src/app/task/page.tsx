'use client';
import TaskView from '@/components/project/TaskView';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { ListItem, UnorderedList } from '@chakra-ui/layout';
import { useSearchParams } from 'next/navigation';

export default function Task() {
	const searchParams = useSearchParams();
	const taskName = searchParams.get('name');
	// const path = usePathname().replace('/task', '');
	const path = '/content%2F22-23%20-%20Race%20Simulator%2FEpisode%201%2FLevel%201';
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
	if (!Array.isArray(data)) {
		return <TaskView item={data}></TaskView>;
	}

	return (
		<UnorderedList>
			{data.map((item: GitHubTreeItem, index) => {
				return <ListItem key={index}>{item.name}</ListItem>;
			})}
		</UnorderedList>
	);
}
