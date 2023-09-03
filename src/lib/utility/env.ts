export enum EnvOptions {
	GitHubToken,
	GithubContentRepository,
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
	}

	if (typeof envValue !== 'string') {
		throw new Error(`Couldn't find environment variable: ${envKey}`);
	}

	return envValue;
}
