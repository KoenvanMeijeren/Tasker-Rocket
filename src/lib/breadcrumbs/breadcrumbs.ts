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
    isSkipped?: boolean;
};

function getBreadcrumb(
    breadcrumb: string,
    index: number,
    breadcrumbs: string[]
): Breadcrumb {
    const breadcrumbPath = breadcrumbs.slice(0, index + 1).join('/');
    return {
        name: urlToReadableString(breadcrumb),
        path: breadcrumbPath.length < 1 ? '/' : breadcrumbPath,
    };
}

function getAllBreadcrumbs(url: string): Breadcrumb[] {
    const breadcrumbs = url.split('/');
    return breadcrumbs.map((breadcrumb: string, index: number) =>
        getBreadcrumb(breadcrumb, index, breadcrumbs)
    );
}

function getCollapsedBreadcrumbs(
    url: string,
    maxVisibleBreadcrumbs: number
): Breadcrumb[] {
    const breadcrumbs = url.split('/');
    const firstBreadcrumbs = breadcrumbs
        .slice(0, maxVisibleBreadcrumbs)
        .map((breadcrumb, index) =>
            getBreadcrumb(breadcrumb, index, breadcrumbs)
        );
    const lastBreadcrumbs = breadcrumbs
        .slice(-maxVisibleBreadcrumbs)
        .map((breadcrumb, index) =>
            getBreadcrumb(
                breadcrumb,
                breadcrumbs.length - maxVisibleBreadcrumbs + index,
                breadcrumbs
            )
        );

    return [
        ...firstBreadcrumbs,
        { name: '...', path: '...', isSkipped: true },
        ...lastBreadcrumbs,
    ];
}

function pathToBreadcrumbs(path: string): Breadcrumb[] {
    const url = removeQueryParamsFromURl(path);
    const isEmptyPath = path === '/[...path]';
    if (isEmptyPath || url === '/') {
        return [];
    }

    if (url.split('/').length > 5) {
        return getCollapsedBreadcrumbs(url, 3);
    }

    return getAllBreadcrumbs(url);
}

export function useBreadcrumbs() {
    const { path } = useCurrentPath();
    const router = useRouter();
    const store = useStore();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const onBreadcrumbClick = useCallback(
        (item: Breadcrumb) => {
            // If the item is skipped, we don't want to do anything.
            if (item.isSkipped === true) return;

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
