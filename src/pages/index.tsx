// Import other necessary modules

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ProjectView } from "@/components/ProjectView";
import NoContentRepo from "@/components/navigation/NoContentRepo";
import { useGitHubContentTree } from "@/lib/repository/gitHubRepository";

export default function Home() {
    // Check if window is defined (client side code)
    const repositoryName =
        typeof window !== 'undefined'
            ? localStorage.getItem('repositoryName') ?? undefined
            : undefined;

    const { data, error, isLoading } = useGitHubContentTree('', repositoryName);

    if (error) {
        return <div>laden mislukt...</div>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!data) {
        return <NoContentRepo />;
    }

    return <ProjectView data={data} parent={undefined} />;
}
