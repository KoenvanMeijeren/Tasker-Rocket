import {
    fetchBlobData,
    fetchJsonData,
    useImmutableDataFetcher,
} from '@/lib/api/dataFetcher';
import { SessionContext } from '@/providers/SessionProvider';
import { useContext } from 'react';
import { useCustomToast } from '@/lib/utility/toast';
import { getEnvValue, EnvOptions } from '@/lib/utility/env';
import { GitHubTreeItem, GitHubTree } from '@/types/gitHubData';

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

export function useGitHubTreeWithContent(path: string) {
    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    if (path === '/[...path]') {
        path = '';
    }

    const customToast = useCustomToast();
    const { session } = useContext(SessionContext);
    const { data, isLoading, error } = useImmutableDataFetcher<
        GitHubTreeItem[] | GitHubTreeItem
    >(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents${path}`,
        bearerToken: session?.provider_token ?? undefined,
        isPrivateData: gitHubConfig.is_private,
    });

    if (error && session) {
        customToast(error.name, error.message, 'error');
    }

    return { data, isLoading, error };
}

/**
 * Fetches recursively all items of a repository.
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
export function useGitHubTree() {
    const { session } = useContext(SessionContext);
    const customToast = useCustomToast();

    const { data, isLoading, error } = useImmutableDataFetcher<GitHubTree>(
        fetchJsonData,
        {
            url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/git/trees/main?recursive=1`,
            bearerToken: session?.provider_token ?? undefined,
            isPrivateData: gitHubConfig.is_private,
        }
    );

    if (error && session) {
        customToast(error.name, error.message, 'error');
    }

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
