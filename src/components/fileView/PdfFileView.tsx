import { File } from '@/types/file';
import React, { useMemo } from 'react';
import { blobFileToUrl } from '@/lib/utility/dataStructure';
import { Button } from '@chakra-ui/react';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import Text from '../textStyles/Text';

export default function PdfFileView({ file }: { file: File }) {
    const viewerRef = React.createRef<HTMLDivElement>();

    const dataSrc = useMemo(() => {
        return blobFileToUrl(file.content, file.mimeType);
    }, [file]);

    const enterFullScreen = () => {
        const viewer = viewerRef.current as HTMLDivElement;
        if (viewer.requestFullscreen) {
            viewer.requestFullscreen().catch((error: unknown) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
        }
    };

    return (
        <div>
            <Button colorScheme="blue" onClick={enterFullScreen}>
                <FaExpandArrowsAlt color="white" />
                <Text color="white" style={{ marginLeft: '5px' }}>
                    Full Screen
                </Text>
            </Button>
            <div
                ref={viewerRef}
                style={{
                    height: '600px',
                    width: '100%',
                }}
            >
                <object
                    data={dataSrc}
                    style={{ height: '100%', width: '100%' }}
                    type={file.mimeType}
                    width="100%"
                >
                    <p>
                        Kan PDF-bestand niet weergeven.
                        <a href={dataSrc}>Download</a> in plaats daarvan.
                    </p>
                </object>
            </div>
        </div>
    );
}
