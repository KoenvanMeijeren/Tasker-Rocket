import { GitHubTreeItem } from '@/types/gitHubData';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import {
    fetchBlobData,
    fetchJsonData,
    useImmutableDataFetcher,
} from '@/lib/api/dataFetcher';
import useSWRImmutable from 'swr/immutable';

export const gitHubConfig = {
    base_url: 'https://api.github.com',
    token: getEnvValue(EnvOptions.GitHubToken),
    content_repository: getEnvValue(EnvOptions.GithubContentRepository),
    is_private_repository:
        getEnvValue(EnvOptions.GitHubRepositoryIsPrivate) === 'true',
};

export function getGitHubFileContentUrl(path: string) {
    return `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/contents/${path}`;
}

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
 *
 * Note: Private files are only downloadable if the download token of GitHub is
 * not expired. That's why we've disabled caching for private files.
 */
export function useGitHubContentTree(path: string) {
    return useImmutableDataFetcher<GitHubTreeItem[] | GitHubTreeItem>(
        fetchJsonData,
        {
            url: getGitHubFileContentUrl(path),
            bearerToken: gitHubConfig.token,
            isPrivateData: gitHubConfig.is_private_repository,
        }
    );
}

/**
 * Fetches the directories of a repository tree based on the provided path.
 *
 * The function constructs a parent tree for the given path by iteratively
 * appending parent paths to the GitHub repository's content endpoint.
 *
 * Example tree:
 * - Folder 1
 * - - Folder 1.1
 * - - - Folder 1.1.1
 * - - File 1.md
 * - File 2.md
 * - Folder 2
 */
export function useGitHubParentTree(path: string) {
    const parentPathParts = path.split('/');
    const parentPathsResult: string[] = [];

    // Build parent paths iteratively by adding them to the GitHub repository's
    // content endpoint.
    while (parentPathParts.length > 0) {
        parentPathsResult.push(
            getGitHubFileContentUrl(parentPathParts.join('/'))
        );
        parentPathParts.pop();
    }

    // Function to fetch data for multiple URLs concurrently
    const multipleDataFetcher = (urls: string[]) =>
        Promise.all(
            urls.map(async (url): Promise<GitHubTreeItem[]> => {
                return (await fetchJsonData({
                    input: url,
                    init: {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${gitHubConfig.token}`,
                        },
                    },
                })) as GitHubTreeItem[];
            })
        );

    return useSWRImmutable<GitHubTreeItem[][]>(
        parentPathsResult,
        multipleDataFetcher,
        {
            shouldRetryOnError: false,
        }
    );
}

/**
 * Fetches the data of a file of a GitHub repository.
 *
 * Note: Private files are only downloadable if the download token of GitHub is
 * not expired. That's why we've disabled caching for private files.
 */
export function useGitHubFileContent(url: string) {
    return useImmutableDataFetcher(fetchBlobData, {
        url,
        isPrivateData: gitHubConfig.is_private_repository,
    });
}
