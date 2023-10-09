import { ProjectView } from '@/components/ProjectView';
import { useGithubContent } from '@/context/useGithubContent';

export default function Home() {
	const { content } = useGithubContent();

	return <ProjectView data={content} parent="" />;
}
