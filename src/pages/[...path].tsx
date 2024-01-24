'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubTreeContentItem } from '@/types/gitHubData';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useCurrentPath } from '@/lib/utility/uri';
import { observer } from 'mobx-react-lite';
import { useParentTree } from '@/lib/project/useParentTree';
import { useStore } from '@/lib/store';
import { useRepositoryContext } from '@/lib/repository/useRepository';

const ProjectContent = observer(() => {
    const store = useStore();
    const { path, isEmptyServerPath } = useCurrentPath();
    const { context: repositoryContext } = useRepositoryContext();

    const { data, error, isLoading } = useGitHubTreeWithContent(
        path,
        repositoryContext
    );
    const parentTree = useParentTree(store);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data || !parentTree || isEmptyServerPath) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data as GitHubTreeContentItem[]}
            parentTree={parentTree}
        />
    );
});

ProjectContent.displayName = 'ProjectContent';
export default ProjectContent;
