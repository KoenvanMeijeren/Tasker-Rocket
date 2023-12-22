'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubTreeItem } from '@/types/gitHubData';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useCurrentPath } from '@/lib/utility/uri';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { observer } from 'mobx-react-lite';
import { useParentTree } from '@/lib/project/useParentTree';

const ProjectContent = observer(() => {
    const openedFileName = useOpenedFileName();
    const { path, isEmptyServerPath } = useCurrentPath();

    const { data, error, isLoading } = useGitHubTreeWithContent(path);
    const parentTree = useParentTree();

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data || !parentTree || isEmptyServerPath) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data as GitHubTreeItem[]}
            openedFileName={openedFileName}
            parentTree={parentTree}
        />
    );
});

ProjectContent.displayName = 'ProjectContent';
export default ProjectContent;
