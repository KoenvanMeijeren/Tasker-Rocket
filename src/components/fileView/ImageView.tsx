'use client';

import { Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { File } from '@/types/file';

export default function ImageView({ file }: { file: File }) {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		setImageUrl(`data:${file.mimeType};base64, ${file.content}`);
	}, [file]);

	return (
		<Box m="auto" maxWidth="980px" minWidth="200px">
			<Image alt={file.name} src={imageUrl} />
		</Box>
	);
}
