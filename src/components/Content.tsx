'use client';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { Box, Stack } from '@chakra-ui/layout';
import { useMemo, useState } from 'react';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from './VerticalDivider';
import Collapsible from './collapsible/Collapsible';

type Data = {
	dirs: GitHubTreeItem[];
	files: GitHubTreeItem[];
};

export function Content({ data }: { data: GitHubTreeItem[] }) {
	const [content, setContent] = useState<Data | null>(null);

	useMemo(() => {
		if (data) {
			setContent(splitFilesAndDirs(data));
		}
	}, [data]);

	if (!content) {
		return null;
	}

	return (
		<Box>
			<FoldersSection data={content.dirs} />
			<Stack
				alignItems="flex-start"
				display="block"
				flexDirection="column"
				mb={3}
				px="60px"
				py="36px"
			>
				{content.files.map((item: GitHubTreeItem, index) => {
					return (
						<Box key={item.sha}>
							<Collapsible key={item.sha} path={item.path} />

							{index != content.files.length - 1 ? <VerticalDivider /> : null}
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
}
