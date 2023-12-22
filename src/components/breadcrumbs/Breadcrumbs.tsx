'use client';

import { useModeColors } from '@/hooks/useModeColors';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiSolidChevronRight } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { useBreadcrumbs } from '@/lib/breadcrumbs/breadcrumbs';

export function Breadcrumbs() {
    const { fontColor } = useModeColors();
    const router = useRouter();
    const breadcrumbs = useBreadcrumbs();
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
