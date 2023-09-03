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
	if (path === '/') {
		return [];
	}

	const breadcrumbs = path.split('/');
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
	const breadcrumbs = pathToBreadcrumbs(usePathname());
	const router = useRouter();
	if (breadcrumbs.length < 1) {
		return <></>;
	}

	return (
		<>
			<Breadcrumb
				spacing="8px"
				separator={<ChevronRightIcon color="gray.500" />}
			>
				{breadcrumbs.map((item, index: number) => {
					return (
						<BreadcrumbItem key={`breadcrumb-item-${index}-${item.path}`}>
							<BreadcrumbLink href="#" onClick={() => router.push(item.path)}>
								{index === 0 && <HiHome />} {item.name}
							</BreadcrumbLink>
						</BreadcrumbItem>
					);
				})}
			</Breadcrumb>
		</>
	);
}
