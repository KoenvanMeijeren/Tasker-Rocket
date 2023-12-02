import { GitHubRecursiveTree, GitHubTreeItem } from '@/types/gitHubData';
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
    return useImmutableDataFetcher<GitHubRecursiveTree>(fetchJsonData, {
        url: `${gitHubConfig.base_url}/repos/${gitHubConfig.content_repository}/git/trees/main?recursive=1`,
        bearerToken: gitHubConfig.token,
        isPrivateData: gitHubConfig.is_private_repository,
    });
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
