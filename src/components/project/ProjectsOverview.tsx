'use client';

import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import Link from 'next/link';
import { GridItem, SimpleGrid } from '@chakra-ui/layout';
import { Card, CardBody } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';

export function ProjectsOverview() {
	const { data, error, isLoading } = useGitHubContentRootTree();

	if (error) {
		return (
			<>
				<div>laden mislukt...</div>
			</>
		);
	}

	if (isLoading) {
		return (
			<>
				<div>laden...</div>
			</>
		);
	}

	if (!data) {
		return (
			<>
				<div>Er zijn geen projecten gevonden.</div>
			</>
		);
	}

	return (
		<SimpleGrid
			templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
			spacing={4}
		>
			{data.map((item: GitHubTreeItem) => {
				return (
					<GridItem key={item.url}>
						<Link href={`./projecten/${item.path}`}>
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
