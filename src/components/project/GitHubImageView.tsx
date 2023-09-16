'use client';

import { useGitHubFileContent } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Image } from '@chakra-ui/react';

export default function GitHubImageView(params: { item: GitHubTreeItem }) {
	const { data, error, isLoading } = useGitHubFileContent(params.item);

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading) {
		return <div>laden...</div>;
	}

	if (!data || !data.download_url) {
		return (
			<Box>
				<Image src="https://via.placeholder.com/150" />
			</Box>
		);
	}

	return (
		<Box>
			<Image
				src={data.download_url}
				alt={params.item.name}
				// fallbackSrc="https://via.placeholder.com/150"
			/>
		</Box>
	);
}
