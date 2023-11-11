import { GitHubTreeItem } from '@/types/gitHubData';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import {
    fetchBlobData,
    fetchJsonData,
    useImmutableDataFetcher,
} from '@/lib/api/dataFetcher';

export const gitHubConfig = {
    base_url: 'https://api.github.com',
    token: getEnvValue(EnvOptions.GitHubToken),
    content_repository: getEnvValue(EnvOptions.GithubContentRepository),
    is_private: getEnvValue(EnvOptions.GitHubRepositoryIsPrivate) === 'true',
};

export function useGitHubContentTree(path: string) {
    const { data, isLoading, error } = useImmutableDataFetcher<
        GitHubTreeItem[] | GitHubTreeItem
    >(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents${path}`,
        bearerToken: gitHubConfig.token,
        isPrivateData: gitHubConfig.is_private,
    });

    return { data, isLoading, error };
}

export function useGitHubContentRootTree() {
    return useGitHubContentTree('');
}

export function useGitHubBlobContent(url: string) {
    return useImmutableDataFetcher(fetchBlobData, {
        url,
        isPrivateData: gitHubConfig.is_private,
    });
}
