'use client';

import { useRouter } from 'next/router';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import Link from 'next/link';
import TaskView from '@/components/project/TaskView';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { GridItem, SimpleGrid } from '@chakra-ui/layout';
import { Card, CardBody } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';

export default function ProjectView() {
	const path = useRouter().asPath.replace('/projecten', '');

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
		<SimpleGrid
			templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
			spacing={4}
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
