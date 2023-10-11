import { isResponseNotFound, isResponseOk } from '@/lib/api/response';
// eslint-disable-next-line import/named
import useSWR, { SWRConfiguration } from 'swr';
import { gitHubConfig } from '@/lib/repository/gitHubRepository';

export const dataFetcher = async ([input, init]: [
	RequestInfo | URL | string,
	RequestInit,
]) => {
	const response = await fetch(input, init);
	if (isResponseNotFound(response)) {
		return undefined;
	}

	if (!isResponseOk(response)) {
		throw new Error('An error occurred while fetching the data.');
	}

	return response.json();
};

export function useDataFetcher<DataType>(
	url: string | URL | RequestInfo,
	payload: RequestInit,
	config: SWRConfiguration = {},
) {
	return useSWR<DataType, Error>([url, payload], dataFetcher, {
		shouldRetryOnError: false,
		...config,
	});
}

export function useAuthenticatedDataFetcher<DataType>(
	url: string | URL | RequestInfo,
	bearerToken: string,
	headers: HeadersInit = {},
	payload: RequestInit = {},
	config: SWRConfiguration = {},
) {
	let requestHeaders: HeadersInit = {
		'Content-Type': 'application/json',
	};
	if (gitHubConfig.is_private) {
		requestHeaders = {
			Authorization: `Bearer ${bearerToken}`,
			...requestHeaders,
		};
	}

	return useDataFetcher<DataType>(
		url,
		{
			headers: {
				...requestHeaders,
				...headers,
			},
			cache: gitHubConfig.is_private ? 'no-store' : 'default',
			...payload,
		},
		config,
	);
}
