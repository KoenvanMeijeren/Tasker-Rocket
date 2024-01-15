import {
    removeQueryParamsFromURl,
    urlToReadableString,
} from '@/lib/utility/formatters';
import { useCurrentPath } from '@/lib/utility/uri';

function pathToBreadcrumbs(path: string): { name: string; path: string }[] {
    const url = removeQueryParamsFromURl(path);
    const isEmptyPath = path === '/[...path]';

    if (url.length < 1 || url === '/' || isEmptyPath) {
        return [];
    }

    const breadcrumbs = url.split('/');

    return breadcrumbs.map((breadcrumb: string, index: number) => {
        const breadcrumbPath = breadcrumbs.slice(0, index + 1).join('/');

        // If the path empty, we need to explicitly set it to the root path.
        if (breadcrumbPath.length < 1) {
            return {
                name: '',
                path: '/',
            };
        }

        return {
            name: urlToReadableString(breadcrumb),
            path: breadcrumbPath,
        };
    });
}

export function useBreadcrumbs() {
    const { path } = useCurrentPath();
    return pathToBreadcrumbs(path);
}
