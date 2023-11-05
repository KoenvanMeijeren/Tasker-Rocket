import { File } from '@/types/file';
import { useMemo } from 'react';
import { Markdown } from '@/components/markdown/Markdown';
import { blobToString } from '@/lib/utility/dataStructure';

export default function MarkdownView({ file }: { file: File }) {
	const content = useMemo(() => {
		return blobToString(file.content);
	}, [file]);

	return <Markdown markdown={content} />;
}
