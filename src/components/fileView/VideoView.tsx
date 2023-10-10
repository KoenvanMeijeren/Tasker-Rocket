import { File } from '@/types/file';
import { useMemo } from 'react';

export default function VideoView({ file }: { file: File }) {
	const dataSrc = useMemo(() => {
		return `data:${file.mimeType};base64, ${file.content}`;
	}, [file]);

	if (file.mimeType.length > 0) {
		return (
			<video controls height="240" width="320">
				<source src={dataSrc} type={file.mimeType} />
			</video>
		);
	}

	return <>De weergave van dit bestandstype wordt niet ondersteund.</>;
}
