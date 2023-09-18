'use client';

import { HiHome } from 'react-icons/hi';
import { usePathname, useRouter } from 'next/navigation';
import { replaceAll, urlToReadableString } from '@/lib/utility/formatters';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const excludedBreadcrumbs: string[] = ['content'];
const removedBreadcrumbCharacters: string[] = ['.md'];

export function pathToBreadcrumbs(path: string): {
	name: string;
	path: string;
}[] {
	const url = decodeURIComponent(path);
	if (url === '/') {
		return [];
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
					replaceAll(breadcrumb, removedBreadcrumbCharacters, ''),
				),
				path: breadcrumbs.slice(0, index + 1).join('/'),
			};
		})
		.filter((item) => item.name !== 'empty');
}

export function Breadcrumbs() {
	const breadcrumbs = pathToBreadcrumbs(usePathname());
	const router = useRouter();
	if (breadcrumbs.length < 1) {
		return <></>;
	}

	return (
		<Breadcrumb separator={<ChevronRightIcon color="gray.500" />} spacing="8px">
			{breadcrumbs.map((item, index: number) => {
				return (
					<BreadcrumbItem key={`breadcrumb-item-${index}-${item.path}`}>
						<BreadcrumbLink href="#" onClick={() => router.push(item.path)}>
							{index === 0 ? <HiHome /> : null} {item.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
				);
			})}
		</Breadcrumb>
	);
}
