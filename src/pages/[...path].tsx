'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import {
    gitHubConfig,
    useGitHubContentTree,
} from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { decodeUrl } from '@/lib/utility/uri';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { buildParentTreeForSearchPath } from '@/lib/utility/dataStructure';
import { useStore } from '@/lib/store';
import { observer } from 'mobx-react-lite';

const ProjectContent = observer(() => {
    const router = useRouter();
    const store = useStore();
    const path = decodeUrl(router.asPath).replaceAll('#', '');
    const repository = gitHubConfig.content_repository;

    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    const isEmptyPath = path === '/[...path]';

    const openedFileName = useOpenedFileName();
    const { data, error, isLoading } = useGitHubContentTree(path);

    const [parent, setParent] = useState<GitHubTreeParentItem | null>(null);
    const parentTree: GitHubTreeParentItem[] = useMemo(() => {
        return buildParentTreeForSearchPath(path, store.indexedTree.items);
    }, [path, store.indexedTree]);

    useEffect(() => {
        if (parentTree.length < 1) return;

        setParent(parentTree[0]);
    }, [parentTree]);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || isEmptyPath) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data as GitHubTreeItem[]}
            openedFileName={openedFileName}
            parent={parent}
            parentTree={parentTree}
            repository={repository}
        />
    );
});

ProjectContent.displayName = 'ProjectContent';
export default ProjectContent;
