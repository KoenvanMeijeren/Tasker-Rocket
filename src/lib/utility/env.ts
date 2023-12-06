export enum EnvOptions {
    GitHubToken,
    GithubContentRepository,
    GitHubRepositoryIsPrivate,
    SupabaseUrl,
    SupabaseKey,
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
        case EnvOptions.SupabaseUrl:
            envValue = process.env.NEXT_PUBLIC_SUPABASE_URL;
            envKey = 'NEXT_PUBLIC_SUPABASE_URL';
            break;
        case EnvOptions.SupabaseKey:
            envValue = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            envKey = 'NEXT_PUBLIC_SUPABASE_ANON_KEY';
    }

    if (typeof envValue !== 'string') {
        throw new Error(`Couldn't find environment variable: ${envKey}`);
    }

    return envValue;
}
