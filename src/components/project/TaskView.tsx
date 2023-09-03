import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Markdown } from '@/components/markdown/Markdown';

export default function TaskView(params: { item: GitHubTreeItem }) {
	const fileContent = Buffer.from(params.item.content ?? '', 'base64').toString(
		'utf8'
	);

	return (
		<>
			<Markdown markdown={fileContent}></Markdown>
		</>
	);
}
