import { File } from '@/types/file';
import { useMemo } from 'react';

export default function AudioView({ file }: { file: File }) {
	const dataSrc = useMemo(() => {
		return `data:${file.mimeType};base64, ${file.content}`;
	}, [file]);

	if (file.mimeType.length > 0) {
		return (
			<audio controls>
				<source src={dataSrc} type={file.mimeType} />
			</audio>
		);
	}

	return <>De weergave van dit bestandstype wordt niet ondersteund.</>;
}
