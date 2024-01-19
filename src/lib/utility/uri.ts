import { useRouter } from 'next/router';
import { removeQueryParamsFromURl } from '@/lib/utility/formatters';

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
    const path = decodeUrl(router.asPath).replaceAll('#', '');

    // Do not fetch data when we are on this path. This causes 404 requests. This url pops up
    // because next.js renders the app twice, once on server and once on client.
    const isEmptyPath = path === '/[...path]';

    return {
        path,
        pathWithoutQuery: removeQueryParamsFromURl(path),
        isEmptyServerPath: isEmptyPath,
    };
}
