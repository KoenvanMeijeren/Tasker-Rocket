import { File } from '@/types/file';
import DocViewer from '@cyntler/react-doc-viewer';

export default function OfficeFileView({ file }: { file: File }) {
    const docs = [
        {
            fileName: file.name,
            uri: file.downloadUrl,
        },
    ];

    return (
        <div className="flex h-[714px] min-w-[200px] m-auto">
            <DocViewer documents={docs} />
        </div>
    );
}
