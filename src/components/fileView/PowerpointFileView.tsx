import { File } from '@/types/file';
import DocViewer from '@cyntler/react-doc-viewer';

export default function PowerPointFileView({ file }: { file: File }) {
	const docs = [{ uri: file.downloadUrl }];

	return (
		<div className="flex h-[714px] w-auto">
			<DocViewer documents={docs} />
		</div>
	);
}
