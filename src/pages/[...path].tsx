'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import {
    useGitHubContentTree,
    useGitHubRecursiveTree,
} from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { recursiveTreeToParentTree } from '@/lib/utility/dataStructure';
import { decodeUrl } from '@/lib/utility/uri';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';

export default function ProjectContent() {
    const router = useRouter();
    const [currentParentItem, setCurrentParentItem] =
        useState<GitHubTreeParentItem | null>(null);
    const [parentTree, setParentTree] = useState<GitHubTreeParentItem[]>([]);

    const path = decodeUrl(router.asPath).replaceAll('#', '');

    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    const isEmptyPath = path === '/[...path]';

    const openedFileName = useOpenedFileName();
    const { data, error, isLoading } = useGitHubContentTree(path);
    const {
        data: parentData,
        isLoading: parentIsLoading,
        error: parentError,
    } = useGitHubRecursiveTree();

    useEffect(() => {
        if (!parentData) return;

        const buildParentTree: GitHubTreeParentItem[] =
            recursiveTreeToParentTree(path, parentData);
        if (!buildParentTree || buildParentTree.length < 1) return;

        setParentTree(buildParentTree);
        if (buildParentTree) {
            setCurrentParentItem(buildParentTree[0]);
        }
    }, [path, parentData]);

    if (error || parentError) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || parentIsLoading || isEmptyPath) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            currentParent={currentParentItem}
            data={data as GitHubTreeItem[]}
            openedFileName={openedFileName}
            parentTree={parentTree}
        />
    );
}
