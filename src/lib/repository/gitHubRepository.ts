import {
    fetchBlobData,
    fetchJsonData,
    useImmutableDataFetcher,
} from '@/lib/api/dataFetcher';
import { RepositoryConfigItem } from '@/lib/store/slices/RepositoryConfigStore';
import { useCustomToast } from '@/lib/utility/toast';
import { GitHubTree, GitHubTreeContentItem } from '@/types/gitHubData';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';

const gitHubConfig = {
    base_url: 'https://api.github.com',
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

export function useGitHubTreeWithContent(
    path: string,
    config: RepositoryConfigItem
) {
    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    if (path === '/[...path]') {
        path = '';
    }

    const customToast = useCustomToast();
    const { data, isLoading, error } = useImmutableDataFetcher<
        GitHubTreeContentItem[] | GitHubTreeContentItem
    >(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${config.repository}/contents${path}`,
        bearerToken: getEnvValue(EnvOptions.GithubToken),
        isPrivateData: config.isPrivate,
    });

    if (error) {
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
export function useGitHubTree(config: RepositoryConfigItem) {
    const customToast = useCustomToast();

    const { data, isLoading, error } = useImmutableDataFetcher<GitHubTree>(
        fetchJsonData,
        {
            url: `${gitHubConfig.base_url}/repos/${config.repository}/git/trees/main?recursive=1`,
            bearerToken: getEnvValue(EnvOptions.GithubToken),
            isPrivateData: config.isPrivate,
        }
    );

    if (error) {
        customToast(error.name, error.message, 'error');
    }

    return { data, isLoading, error };
}

/**
 * Fetches the data of a file of a GitHub repository.
 */
export function useGitHubFileContent(
    url: string,
    config: RepositoryConfigItem
) {
    return useImmutableDataFetcher(fetchBlobData, {
        url,
        isPrivateData: config.isPrivate,
    });
}

export async function gitHubValidateRepository(
    config: RepositoryConfigItem,
    bearerToken: string
) {
    return fetch(`${gitHubConfig.base_url}/repos/${config.repository}`, {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `GitHub repository ${config.repository} not found.`
                );
            }
            return true;
        })
        .catch(() => {
            throw new Error(
                `GitHub repository ${config.repository} not found.`
            );
        });
}
