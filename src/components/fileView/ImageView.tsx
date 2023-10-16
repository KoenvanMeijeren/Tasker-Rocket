'use client';

import { Box, Image } from '@chakra-ui/react';
import { File } from '@/types/file';
import { useMemo } from 'react';
import { blobFileToUrl } from '@/lib/utility/dataStructure';

export default function ImageView({ file }: { file: File }) {
	const dataSrc = useMemo(() => {
		return blobFileToUrl(file.content, file.mimeType);
	}, [file]);

	return (
		<Box m="auto" maxWidth="980px" minWidth="200px">
			<Image alt={file.name} src={dataSrc} />
		</Box>
	);
}
