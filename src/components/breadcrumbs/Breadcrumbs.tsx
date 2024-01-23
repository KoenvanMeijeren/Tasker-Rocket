'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { BiSolidChevronRight } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { useBreadcrumbs } from '@/lib/breadcrumbs/breadcrumbs';
import { useColorConfig } from '@/lib/colors/useColorConfig';

export function Breadcrumbs() {
    const colorConfig = useColorConfig();
    const { breadcrumbs, onBreadcrumbClick } = useBreadcrumbs();
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
                            color={colorConfig.font}
                            onClick={() => {
                                onBreadcrumbClick(item);
                            }}
                        >
                            {index === 0 ? <HiHome /> : null} {item.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
