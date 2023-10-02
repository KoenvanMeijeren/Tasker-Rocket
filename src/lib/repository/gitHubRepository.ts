import { useAuthenticatedDataFetcher } from '@/lib/api/dataFetcher';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';

export const gitHubConfig = {
	base_url: 'https://api.github.com',
	token: getEnvValue(EnvOptions.GitHubToken),
	content_repository: getEnvValue(EnvOptions.GithubContentRepository),
};

export function useGitHubContentRootTree() {
	return useAuthenticatedDataFetcher<GitHubTreeItem[]>(
		`${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents`,
		gitHubConfig.token,
	);
}
export function useGitHubContentTree(path: string) {
	const { data, isLoading, error } = useAuthenticatedDataFetcher<
		GitHubTreeItem[] | GitHubTreeItem
	>(
		`${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents${path}`,
		gitHubConfig.token,
	);

	return { data, isLoading, error };
}
