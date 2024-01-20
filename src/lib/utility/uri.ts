import { useRouter } from 'next/router';
import { removeQueryParamsFromURl } from '@/lib/utility/formatters';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

export function decodeUrl(url: string): string {
    try {
        return decodeURIComponent(url);
    } catch (error) {
        // Silence the URIError which is thrown if encodedURI contains a % not followed by two
        // hexadecimal digits, or if the escape sequence does not encode a valid UTF-8 character.
        return '';
    }
}

export function useCurrentPath() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const path = decodeUrl(router.asPath).replaceAll('#', '');

    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    const isEmptyPath = path === '/[...path]';

    const updateQueryParamsHandler = (addedParams: object) => {
        const query = router.query;
        const updatedParams = {
            ...query,
            ...addedParams,
        };

        void router.push({
            pathname: router.pathname,
            query: updatedParams,
        });
    };

    return {
        path,
        pathname: router.pathname,
        router,
        pathWithoutQuery: removeQueryParamsFromURl(path),
        searchParams: searchParams,
        isEmptyServerPath: isEmptyPath,
        updateQueryParamsHandler,
    };
}

export const buildUri = (
    path: string,
    params: ReadonlyURLSearchParams | null,
    extraParams?: string
) => {
    const uri = encodeURIComponent(path);
    const paramsString = params?.toString() ?? '';
    if (extraParams !== undefined) {
        if (paramsString === '') {
            return `${uri}?${extraParams}`;
        }

        return `${uri}?${paramsString}&${extraParams}`;
    }

    if (paramsString === '') {
        return uri;
    }

    return `${uri}?${paramsString}`;
};
