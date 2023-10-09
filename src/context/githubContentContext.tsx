import { LoadingIndicator } from '@/components/LoadingIndicator';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentRootTree } from '@/lib/repository/gitHubRepository';
import { createContext } from 'react';

type GithubContentContextType = {
	content: GitHubTreeItem[];
	findContent: (name: string) => GitHubTreeItem | undefined;
};

export const GithubContentContext =
	createContext<GithubContentContextType>(undefined);

export const GithubContentProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { data, error, isLoading } = useGitHubContentRootTree();

	// Handle loading and error states if needed
	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading || !data) {
		return <LoadingIndicator />;
	}

	const findContent = (name: string) =>
		data?.find((item: GitHubTreeItem) => item.name === name);

	const contextValue: GithubContentContextType = {
		content: data,
		findContent,
	};

	return (
		<GithubContentContext.Provider value={contextValue}>
			{children}
		</GithubContentContext.Provider>
	);
};
