import {
    fetchBlobData,
    fetchJsonData,
    useImmutableDataFetcher,
} from '@/lib/api/dataFetcher';
import { SessionContext } from '@/providers/SessionProvider';
import { useContext } from 'react';
import { useCustomToast } from '@/lib/utility/toast';
import { getEnvValue, EnvOptions } from '@/lib/utility/env';
import {
    GitHubTreeItem,
    GithubTree,
    GitHubRecursiveTree,
} from '@/types/gitHubData';

export const gitHubConfig = {
    base_url: 'https://api.github.com',
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
    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    if (path === '/[...path]') {
        path = '';
    }

    path = recursive ? '/git/trees/main?recursive=1' : `/contents${path}`;

    const customToast = useCustomToast();
    const { session } = useContext(SessionContext);
    const { data, isLoading, error } = useImmutableDataFetcher<
        GitHubTreeItem[] | GitHubTreeItem | GithubTree
    >(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}${path}`,
        bearerToken: session?.provider_token ?? undefined,
        isPrivateData: gitHubConfig.is_private,
    });

    if (error) {
        if (session) {
            customToast(error.name, error.message, 'error');
        }
    }

    return { data, isLoading, error };
}

/**
 * Fetches recursively all items of a repository.
 *
 * The function constructs a parent tree for the given path by iteratively
 * appending parent paths to the GitHub repository's content endpoint.
 *
 * Example tree:
 * - Folder 1
 * - - File 1.md
 * - - File 2.md
 * - - Folder 1.1
 * - - - File 1.1.1.md
 * - - - File 1.1.2.md
 * - Folder 2
 *
 * Note: These items don't contain the content of the files.
 */
export function useGitHubRecursiveTree() {
    const { session } = useContext(SessionContext);

    return useImmutableDataFetcher<GitHubRecursiveTree>(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/git/trees/main?recursive=1`,
        bearerToken: session?.provider_token ?? undefined,
        isPrivateData: gitHubConfig.is_private,
    });
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
