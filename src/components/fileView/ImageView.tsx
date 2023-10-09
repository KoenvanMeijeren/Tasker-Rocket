'use client';

import { Box, Image } from '@chakra-ui/react';
import { File } from '@/types/file';
import { useMemo } from 'react';

export default function ImageView({ file }: { file: File }) {
	const imageUrl = useMemo(() => {
		return `data:${file.mimeType};base64, ${file.content}`;
	}, [file]);

	return (
		<Box m="auto" maxWidth="980px" minWidth="200px">
			<Image alt={file.name} src={imageUrl} />
		</Box>
	);
}
