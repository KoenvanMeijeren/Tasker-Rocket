import { File } from '@/types/file';
import { useMemo } from 'react';
import { blobFileToUrl } from '@/lib/utility/dataStructure';

export default function VideoView({ file }: { file: File }) {
    const dataSrc = useMemo(() => {
        return blobFileToUrl(file.content, file.mimeType);
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
