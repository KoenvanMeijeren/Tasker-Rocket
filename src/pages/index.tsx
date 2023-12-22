import { LoadingIndicator } from '@/components/general/LoadingIndicator';
import { ProjectView } from '@/components/project/ProjectView';
import { useOpenedFileName } from '@/hooks/useOpenedFileName';
import { useGitHubTreeWithContent } from '@/lib/repository/gitHubRepository';
import { useEffect, useState } from 'react';
import { GitHubParentTree } from '@/types/gitHubData';
import { buildParentTreeForSearchPath } from '@/lib/utility/dataStructure';

export default function Home() {
    const openedFileName = useOpenedFileName();
    const { data, error, isLoading } = useGitHubTreeWithContent('');
    const [parentTree, setParentTree] = useState<GitHubParentTree>();

    useEffect(() => {
        const result = buildParentTreeForSearchPath('', []);

        setParentTree({
            parent: result[0],
            tree: result,
        });
    }, []);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading || !data || !parentTree) {
        return <LoadingIndicator />;
    }

    return (
        <ProjectView
            data={data}
            openedFileName={openedFileName}
            parentTree={parentTree}
        />
    );
}
