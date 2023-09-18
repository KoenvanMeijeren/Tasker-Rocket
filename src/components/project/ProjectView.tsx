'use client';

import TaskView from '@/components/project/TaskView';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { Card, CardBody, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProjectView() {
	const path = usePathname().replace('/projecten', '');
	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path),
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
		return <TaskView item={data} />;
	}

	return (
		<SimpleGrid
			spacing={4}
			templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
		>
			{data.map((item: GitHubTreeItem) => {
				return (
					<GridItem key={item.url}>
						<Link href={`/projecten/${encodeURIComponent(item.path)}`}>
							<Card>
								<CardBody>
									<Text>{item.name}</Text>
								</CardBody>
							</Card>
						</Link>
					</GridItem>
				);
			})}
		</SimpleGrid>
	);
}
