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

export default function ProjectContent() {
    const router = useRouter();
    const [currentParentItem, setCurrentParentItem] =
        useState<GitHubTreeParentItem | null>(null);
    const [parentTree, setParentTree] = useState<GitHubTreeParentItem[]>([]);

    const path = decodeURIComponent(router.asPath).replaceAll('#', '');
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

    if (isLoading || parentIsLoading) {
        return <LoadingIndicator />;
    }

    if (!data) {
        return <div>geen data gevonden</div>;
    }

    return (
        <ProjectView
            currentParent={currentParentItem}
            data={data as GitHubTreeItem[]}
            parentTree={parentTree}
        />
    );
}
