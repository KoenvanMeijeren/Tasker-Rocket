'use client';

import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { imageExtensions } from '@/types/extensions';
import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function GitHubImageView(props: {
	item: GitHubTreeItem;
	imageType: string;
}) {
	const { item, imageType } = props;
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const content = item.content ?? '';
		const imageDataType = imageExtensions[imageType] ?? 'image/png';

		setImageUrl(`data:${imageDataType};base64, ${content}`);
	}, [item, imageType]);

	return (
		<Box minWidth="200px" maxWidth="980px" m="auto">
			<Image src={imageUrl} alt={item.name} />
		</Box>
	);
}
