import { File } from '@/types/file';
import { useMemo } from 'react';
import { blobFileToUrl } from '@/lib/utility/dataStructure';

export default function PdfFileView({ file }: { file: File }) {
	const dataSrc = useMemo(() => {
		return blobFileToUrl(file.content, file.mimeType);
	}, [file]);

	return (
		<object data={dataSrc} height="600px" type={file.mimeType} width="100%">
			<p>
				Kan PDF-bestand niet weergeven. <a href={dataSrc}>Download</a> in plaats
				daarvan.
			</p>
		</object>
	);
}
