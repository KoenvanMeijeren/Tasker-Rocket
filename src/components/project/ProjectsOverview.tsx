'use client';

import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';

import { Card, CardBody, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const ProjectsOverview = () => {
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
		<SimpleGrid
			spacing={4}
			templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
		>
			{data.map((item: GitHubTreeItem) => {
				return (
					<GridItem key={item.url}>
						<Link href={`./projecten/${encodeURIComponent(item.path)}`}>
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
};
