import { Markdown } from '@/components/markdown/Markdown';
import { blobToString } from '@/lib/utility/dataStructure';
import { File } from '@/types/file';
import { useMemo } from 'react';

export default function MarkdownView({ file }: { file: File }) {
    const content = useMemo(() => {
        return blobToString(file.content);
    }, [file]);

    return <Markdown markdown={content} />;
}
