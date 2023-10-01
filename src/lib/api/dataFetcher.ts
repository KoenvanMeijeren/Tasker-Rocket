import { isResponseNotFound, isResponseOk } from '@/lib/api/response';
// eslint-disable-next-line import/named
import useSWR, { SWRConfiguration } from 'swr';

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
	return useDataFetcher<DataType>(
		url,
		{
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json',
				...headers,
			},
			...payload,
		},
		config,
	);
}
