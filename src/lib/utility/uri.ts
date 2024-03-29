import { NextRouter, useRouter } from 'next/router';
import { removeIdAnchorFromURl, stripUri } from '@/lib/utility/formatters';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

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
    const path = removeIdAnchorFromURl(decodeUrl(router.asPath));

    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    const isEmptyPath = path === '/[...path]';

    return {
        path,
        pathname: router.pathname,
        router,
        pathStripped: stripUri(path),
        searchParams: searchParams,
        isEmptyServerPath: isEmptyPath,
    };
}

const handleUpdateQueryParams = (router: NextRouter, addedParams: object) => {
    const query = router.query;
    const mergedParams = {
        ...query,
        ...addedParams,
    };

    // Replace existing values with the addedParams
    const updatedParams = Object.fromEntries(
        Object.entries(mergedParams).map(([key, value]) => [
            key,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-prototype-builtins
            addedParams.hasOwnProperty(key) ? addedParams[key] : value,
        ])
    );

    void router.push(
        {
            pathname: router.pathname,
            query: updatedParams,
        },
        undefined,
        { shallow: true }
    );
};

export const useUriHandlers = () => {
    const router = useRouter();

    const updateQueryParams = useCallback(
        (addedParams: object) => {
            handleUpdateQueryParams(router, addedParams);
        },
        [router]
    );

    return {
        updateQueryParams,
    };
};

export const buildUri = (
    path: string,
    params: ReadonlyURLSearchParams | null,
    addedParams: object = {},
    excludedParams: string[] = []
) => {
    const uri = encodeURIComponent(path);

    const mergedParams = {
        ...(params ? Object.fromEntries(params) : {}),
        ...addedParams,
    };

    // Filter out excluded parameters
    const filteredParams = Object.fromEntries(
        Object.entries(mergedParams).filter(
            ([key]) => !excludedParams.includes(key)
        )
    );

    const queryParams = new URLSearchParams(filteredParams);
    const query = queryParams.toString();
    if (query.length === 0) {
        return `/${uri}`;
    }

    return `/${uri}?${query}`;
};
