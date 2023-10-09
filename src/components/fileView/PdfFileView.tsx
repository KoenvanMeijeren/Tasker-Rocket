import { File } from '@/types/file';
import { useEffect, useState } from 'react';

export default function PdfFileView({ file }: { file: File }) {
	const [pdfDataSrc, setPdfDataSrc] = useState('');

	useEffect(() => {
		setPdfDataSrc(`data:${file.mimeType};base64, ${file.content}`);
	}, [file]);

	return (
		<object data={pdfDataSrc} height="600px" type={file.mimeType} width="100%">
			<p>
				Kan PDF-bestand niet weergeven. <a href={pdfDataSrc}>Download</a> in
				plaats daarvan.
			</p>
		</object>
	);
}
