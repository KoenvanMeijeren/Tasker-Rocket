import {
    fetchBlobData,
    fetchJsonData,
    useImmutableDataFetcher,
} from '@/lib/api/dataFetcher';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { GitHubTreeItem, GithubTree } from '@/types/gitHubData';

export const gitHubConfig = {
    base_url: 'https://api.github.com',
    token: getEnvValue(EnvOptions.GitHubToken),
    content_repository: getEnvValue(EnvOptions.GithubContentRepository),
    is_private: getEnvValue(EnvOptions.GitHubRepositoryIsPrivate) === 'true',
};

/**
 * Fetches the data of GitHub repository tree.
 *
 * The content of the tree items is partially downloaded, only if the file is,
 * smaller than 2 MB.
 *
 * Example tree:
 * - Folder 1
 * - - File 1.md
 * - - File 2.md
 * - - Folder 1.1
 * - - - File 1.1.1.md
 * - - - File 1.1.2.md
 * - Folder 2
 */

export function useGitHubContentTree(path: string, recursive = false) {
    path = recursive ? '/git/trees/main?recursive=1' : `/contents${path}`;

    const { data, isLoading, error } = useImmutableDataFetcher<
        GitHubTreeItem[] | GitHubTreeItem | GithubTree
    >(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}${path}`,
        bearerToken: gitHubConfig.token,
        isPrivateData: gitHubConfig.is_private,
    });

    return { data, isLoading, error };
}

/**
 * Fetches the data of a file of a GitHub repository.
 */
export function useGitHubFileContent(url: string) {
    return useImmutableDataFetcher(fetchBlobData, {
        url,
        isPrivateData: gitHubConfig.is_private,
    });
}
