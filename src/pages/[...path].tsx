'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubParentTree, GitHubTreeItem } from '@/types/gitHubData';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';
import { decodeUrl } from '@/lib/utility/uri';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { buildParentTreeForSearchPath } from '@/lib/utility/dataStructure';

const ProjectContent = observer(() => {
    const router = useRouter();
    const store = useStore();
    const openedFileName = useOpenedFileName();
    const path = decodeUrl(router.asPath).replaceAll('#', '');

    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    const isEmptyPath = path === '/[...path]';

    const { data, error, isLoading } = useGitHubTreeWithContent(path);
    const [parentTree, setParentTree] = useState<GitHubParentTree>();

    useEffect(() => {
        if (isEmptyPath) return;

        const menuTree = store.menuTree.items;
        const result = buildParentTreeForSearchPath(path, menuTree);
        setParentTree({
            parent: result[0],
            tree: result,
        });
    }, [isEmptyPath, path, store.menuTree.items]);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || isEmptyPath || !parentTree) {
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
