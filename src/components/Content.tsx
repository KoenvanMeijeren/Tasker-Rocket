'use client';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Stack } from '@chakra-ui/layout';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { FoldersSection } from './FoldersSection';
import { sortArrayByName } from '@/lib/utility/formatters';
import VerticalDivider from './VerticalDivider';
import Collapsible from './collapsible/Collapsible';

export function Content({ data }: { data: GitHubTreeItem[] }) {
	console.log(data)
	const [dirs, files] = splitFilesAndDirs(data);
	const sortedDirs = dirs.sort();

	return (
		<Box >
			<FoldersSection data={sortedDirs} />
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
						<>
							<Collapsible key={item.name} path={item.path} />

							{index != files.length - 1 ? (
								<VerticalDivider />
							) : null}
						</>
					);
				})}
			</Stack>
		</Box>
	);
}