export enum EnvOptions {
    GitHubToken,
    GithubContentRepository,
    GitHubRepositoryIsPrivate,
}

export function getEnvValue(key: EnvOptions): string {
    let envValue: string | null | undefined = null;
    let envKey = '';
    switch (key) {
        case EnvOptions.GitHubToken:
            envValue = process.env.GITHUB_TOKEN;
            envKey = 'GITHUB_TOKEN';
            break;
        case EnvOptions.GithubContentRepository:
            envValue = process.env.GITHUB_CONTENT_REPOSITORY;
            envKey = 'GITHUB_CONTENT_REPOSITORY';
            break;
        case EnvOptions.GitHubRepositoryIsPrivate:
            envValue = process.env.GITHUB_REPOSITORY_IS_PRIVATE;
            envKey = 'GITHUB_REPOSITORY_IS_PRIVATE';
            break;
    }

    if (typeof envValue !== 'string') {
        envValue = undefined;
    }

    return envValue || '';
}
