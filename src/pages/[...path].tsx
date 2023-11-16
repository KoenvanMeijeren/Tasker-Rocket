'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import {
    useGitHubContentTree,
    useGitHubParentTree,
} from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { buildParentTreeForCurrentPath } from '@/lib/utility/dataStructure';

export default function ProjectContent() {
    const router = useRouter();
    const [parentItem, setParentItem] = useState<GitHubTreeParentItem | null>(
        null
    );
    const [parentTree, setParentTree] = useState<GitHubTreeParentItem[]>([]);

    const path = decodeURIComponent(router.asPath).replaceAll('#', '');
    const { data, error, isLoading } = useGitHubContentTree(path);
    const {
        data: parentData,
        isLoading: parentIsLoading,
        error: parentError,
    } = useGitHubParentTree(path);

    useEffect(() => {
        if (!parentData) return;

        const buildParentTree = buildParentTreeForCurrentPath(path, parentData);
        if (!buildParentTree) return;

        setParentTree(buildParentTree);
        if (buildParentTree) {
            setParentItem(buildParentTree[0]);
        }
    }, [path, parentData]);

    if (error || parentError) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || parentIsLoading || !data || !parentData) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data as GitHubTreeItem[]}
            parent={parentItem}
            parentTree={parentTree}
        />
    );
}
