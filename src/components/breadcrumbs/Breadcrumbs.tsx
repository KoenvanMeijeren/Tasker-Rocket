'use client';

import { useModeColors } from '@/hooks/useModeColors';
import {
    removeQueryParamsFromURl,
    replaceAll,
    urlToReadableString,
} from '@/lib/utility/formatters';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiSolidChevronRight } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { decodeUrl } from '@/lib/utility/uri';

const excludedBreadcrumbs: string[] = ['#'];
const removedBreadcrumbCharacters: string[] = ['.md'];

function pathToBreadcrumbs(path: string): {
    name: string;
    path: string;
}[] {
    let url = removeQueryParamsFromURl(decodeUrl(path));
    if (url.length < 1 || url === '/') {
        return [];
    }
    if (url.startsWith('/groups/info/')) {
        url = '/groups/info';
    } else if (url.startsWith('/groups/add/')) {
        url = '/groups/add';
    }

    const breadcrumbs = url.split('/');
    return breadcrumbs
        .map((breadcrumb: string, index: number) => {
            if (excludedBreadcrumbs.includes(breadcrumb)) {
                return {
                    name: 'empty',
                    path: '',
                };
            }

            const breadcrumbPath = breadcrumbs.slice(0, index + 1).join('/');
            if (breadcrumbPath.length < 1) {
                return {
                    name: '',
                    path: '/',
                };
            }

            return {
                name: urlToReadableString(
                    replaceAll(breadcrumb, removedBreadcrumbCharacters, '')
                ),
                path: breadcrumbs.slice(0, index + 1).join('/'),
            };
        })
        .filter((item) => item.name !== 'empty');
}

export function Breadcrumbs() {
    const { fontColor } = useModeColors();
    const router = useRouter();
    const breadcrumbs = pathToBreadcrumbs(router.asPath);
    if (breadcrumbs.length < 1) {
        return null;
    }

    return (
        <Breadcrumb
            separator={<BiSolidChevronRight color="gray.500" />}
            spacing="8px"
        >
            {breadcrumbs.map((item, index: number) => {
                return (
                    <BreadcrumbItem
                        key={`breadcrumb-item-${index}-${item.path}`}
                    >
                        <BreadcrumbLink
                            color={fontColor}
                            href="#"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={() => router.push(item.path)}
                        >
                            {index === 0 ? <HiHome /> : null} {item.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
