'use client';

import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { imageExtensions } from '@/types/extensions';
import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function GitHubImageView({
	item,
	imageType,
}: {
	item: GitHubTreeItem;
	imageType: string;
}) {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const content = item.content ?? '';
		const imageDataType = imageExtensions[imageType] ?? 'image/png';

		setImageUrl(`data:${imageDataType};base64, ${content}`);
	}, [item, imageType]);

	return (
		<Box m="auto" maxWidth="980px" minWidth="200px">
			<Image alt={item.name} src={imageUrl} />
		</Box>
	);
}
