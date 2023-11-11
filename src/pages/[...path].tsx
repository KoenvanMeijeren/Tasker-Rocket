'use client';

import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { GitHubTreeItem, GitHubTreeParentItem } from '@/types/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { hashItem } from '@/lib/utility/dataStructure';
import isEqual from 'lodash/isEqual';

export default function ProjectContent() {
    const router = useRouter();
    const [parentItem, setParentItem] = useState<GitHubTreeParentItem | null>(
        null
    );

    const path = decodeURIComponent(router.asPath).replaceAll('#', '');
    const parentPathParts = path.split('/');
    parentPathParts.pop();
    const parentPath = parentPathParts.join('/');

    const { data, error, isLoading } = useGitHubContentTree(path);
    const parentResult = useGitHubContentTree(parentPath);

    useEffect(() => {
        if (!parentResult.data) return;

        const parentData = parentResult.data;
        if (!Array.isArray(parentData)) return;

        let searchPath = path;
        if (searchPath.charAt(0) === '/') {
            searchPath = searchPath.substring(1);
        }

        const searchResult = parentData.find(
            (item) => item.path === searchPath
        );

        if (searchResult) {
            hashItem(searchResult);
            const newItem: GitHubTreeParentItem = {
                parentKey: searchResult.unique_key,
                name: searchResult.name,
                subTreeChildren: Array.isArray(data) ? data.length : 0,
                children: parentData.length,
            };

            if (!isEqual(newItem, parentItem)) {
                setParentItem(newItem);
            }
        }
    }, [data, parentResult, path, parentItem, parentPath]);

    if (error || parentResult.error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || parentResult.isLoading || !data || !parentResult.data) {
        return <LoadingIndicator />;
    }

    return <ProjectView data={data as GitHubTreeItem[]} parent={parentItem} />;
}
