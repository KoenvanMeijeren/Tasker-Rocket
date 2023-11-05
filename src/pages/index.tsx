import { ProjectView } from '@/components/ProjectView';
import { useGithubContent } from '@/context/useGithubContent';
import { useSearchParams } from 'next/navigation';

export default function Home() {
	const { content } = useGithubContent();
	const searchParams = useSearchParams();
	const openedFile = searchParams.get('file');
	return <ProjectView data={content} openedFile={openedFile} parent="" />;
}
