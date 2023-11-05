import {
    useAuthenticatedImmutableDataFetcher,
    useImmutableDataBlobFetcher,
    useImmutableDataRawFetcher,
} from '@/lib/api/dataFetcher';
import { GitHubTreeItem } from '@/types/gitHubData';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';

export const gitHubConfig = {
    base_url: 'https://api.github.com',
    token: getEnvValue(EnvOptions.GitHubToken),
    content_repository: getEnvValue(EnvOptions.GithubContentRepository),
    is_private: getEnvValue(EnvOptions.GitHubRepositoryIsPrivate) === 'true',
};

export function useGitHubContentRootTree() {
    return useAuthenticatedImmutableDataFetcher<GitHubTreeItem[]>(
        `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents`,
        gitHubConfig.token
    );
}
export function useGitHubContentTree(path: string) {
    const { data, isLoading, error } = useAuthenticatedImmutableDataFetcher<
        GitHubTreeItem[] | GitHubTreeItem
    >(
        `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents${path}`,
        gitHubConfig.token
    );

    return { data, isLoading, error };
}

export function useGitHubRawContent(url: string) {
    return useImmutableDataRawFetcher(url);
}

export function useGitHubBlobContent(url: string) {
    return useImmutableDataBlobFetcher(url);
}
