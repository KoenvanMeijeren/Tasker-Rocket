'use client';

import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { imageExtensions } from '@/components/project/TaskView';

export default function GitHubImageView(params: {
	item: GitHubTreeItem;
	imageType: string;
}) {
	const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
		const content = params.item.content ?? '';
		const imageDataType = imageExtensions[params.imageType] ?? 'image/png';

		setImageUrl(`data:${imageDataType};base64, ${content}`);
	}, [params]);

	return (
		<Box minWidth="200px" maxWidth="980px" m="auto">
			<Image src={imageUrl} alt={params.item.name} />
		</Box>
	);
}
