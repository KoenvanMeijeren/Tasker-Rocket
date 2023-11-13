import { File } from '@/types/file';
import { useMemo } from 'react';
import { blobFileToUrl } from '@/lib/utility/dataStructure';

export default function AudioView({ file }: { file: File }) {
    const dataSrc = useMemo(() => {
        return blobFileToUrl(file.content, file.mimeType);
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
