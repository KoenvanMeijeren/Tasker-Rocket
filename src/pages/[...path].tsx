'use client';
import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { removeQueryParamsFromURl } from '@/lib/utility/formatters';
import { GitHubTreeItem } from '@/types/gitHubData';
import { useRouter } from 'next/router';
import ErrorCard from '@/components/error/ErrorCard';

export default function ProjectContent() {
    const router = useRouter();
    const path = removeQueryParamsFromURl(decodeURI(router.asPath));
    const parent = path.split('/').pop();

    const openedFileName = useOpenedFileName();
    const { data, error, isLoading } = useGitHubContentTree(path);

    if (error) {
        return ErrorCard(error.message);
    }

    if (isLoading || !data) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data as GitHubTreeItem[]}
            openedFileName={openedFileName}
            parent={parent || ''}
        />
    );
}
