import { isResponseNotFound, isResponseOk } from '@/lib/api/response';
import useSWR, { BareFetcher, Fetcher, SWRConfiguration } from 'swr';
import useSWRImmutable from 'swr/immutable';

interface FetcherOptions {
	input: RequestInfo | URL | string;
	init: RequestInit;
}

export const fetchData = async (options: FetcherOptions) => {
	const response = await fetch(options.input, options.init);

	if (isResponseNotFound(response)) {
		return undefined;
	}

	if (!isResponseOk(response)) {
		throw new Error('An error occurred while fetching the data.');
	}

	return response;
};

export const fetchJsonData = async (options: FetcherOptions) => {
	return (await fetchData(options))?.json();
};

export const fetchBlobData = async (options: FetcherOptions) => {
	return (await fetchData(options))?.blob();
};

export interface SwrRequestInput {
	url: string | URL | RequestInfo;
	payload?: RequestInit;
	bearerToken?: string;
	isPrivateData?: boolean;
}

const convertToFetcherOptions = (options: SwrRequestInput): FetcherOptions => {
	const {
		url,
		payload = {},
		bearerToken = '',
		isPrivateData = false,
	} = options;

	const headers: HeadersInit = {
		...payload.headers,
		...(bearerToken.length > 0 && { Authorization: `Bearer ${bearerToken}` }),
	};

	return {
		input: url,
		init: {
			...payload,
			headers,
			cache: isPrivateData ? 'no-store' : 'default',
		},
	};
};

export const useDataFetcher = <DataType>(
	dataFetcher: BareFetcher<DataType> | Fetcher<DataType> | null,
	options: SwrRequestInput,
	config: SWRConfiguration = {},
) => {
	const fetcherOptions = convertToFetcherOptions(options);

	return useSWR<DataType, Error>(fetcherOptions, dataFetcher, {
		shouldRetryOnError: false,
		...config,
	});
};

export const useImmutableDataFetcher = <DataType>(
	dataFetcher: BareFetcher<DataType> | Fetcher<DataType> | null,
	options: SwrRequestInput,
	config: SWRConfiguration = {},
) => {
	const fetcherOptions = convertToFetcherOptions(options);

	return useSWRImmutable<DataType, Error>(fetcherOptions, dataFetcher, {
		shouldRetryOnError: false,
		...config,
	});
};
