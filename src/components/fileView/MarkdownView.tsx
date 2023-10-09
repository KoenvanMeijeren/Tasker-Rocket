import { File } from '@/types/file';
import { useMemo } from 'react';
import { Markdown } from '@/components/markdown/Markdown';

export default function MarkdownView({ file }: { file: File }) {
	const content = useMemo(() => {
		return Buffer.from(file.content, 'base64').toString('utf8');
	}, [file]);

	return <Markdown markdown={content} />;
}
