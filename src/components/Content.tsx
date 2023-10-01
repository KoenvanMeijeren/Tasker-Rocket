'use client';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { Box, Stack } from '@chakra-ui/layout';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from './VerticalDivider';
import Collapsible from './collapsible/Collapsible';

export function Content({ data }: { data: GitHubTreeItem[] }) {
	const [dirs, files] = splitFilesAndDirs(data);

	return (
		<Box >
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