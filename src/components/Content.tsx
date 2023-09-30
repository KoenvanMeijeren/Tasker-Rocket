'use client';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from './VerticalDivider';
import Collapsible from './collapsible/Collapsible';

export function Content({ data }: { data: GitHubTreeItem[] }) {
	const [dirs, files] = splitFilesAndDirs(data);
	dirs.sort();

	return (
		<Box>
			<FoldersSection data={dirs} />
			<Stack
				alignItems="flex-start"
				display="block"
				flexDirection="column"
				mb={3}
				px="60px"
				py="36px"
			>
				{files.map((item: GitHubTreeItem, index) => {
					return (
						<Box key={item.sha}>
							<Collapsible key={item.sha} path={item.path} />

							{index != files.length - 1 ? <VerticalDivider /> : null}
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
}
