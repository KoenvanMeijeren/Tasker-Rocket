import {
    removeQueryParamsFromURl,
    urlToReadableString,
} from '@/lib/utility/formatters';
import { useCurrentPath } from '@/lib/utility/uri';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/lib/store';

type Breadcrumb = {
    name: string;
    path: string;
};

function pathToBreadcrumbs(path: string): Breadcrumb[] {
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
    const router = useRouter();
    const store = useStore();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const onBreadcrumbClick = useCallback(
        (item: Breadcrumb) => {
            void router.push(item.path);
            store.menuTree.setOpenedFilePath('');

            // If we are on the root path, we need to reset the active items.
            if (item.path === '/') {
                store.menuTree.resetActiveItems();
            }
        },
        [router, store]
    );

    useEffect(() => {
        setBreadcrumbs(pathToBreadcrumbs(path));
    }, [path]);

    return { breadcrumbs, onBreadcrumbClick };
}
