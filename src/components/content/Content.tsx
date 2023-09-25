'use client';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Center, Divider, Stack } from '@chakra-ui/layout';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { useModeColors } from '@/hooks/useColors';
import Task from '@/components/task/Task';
import { FoldersSection } from './FoldersSection';
import { sortArrayByName } from '@/lib/utility/formatters';

export function Content({ data }: { data: GitHubTreeItem[] }) {
	const { border } = useModeColors();
	const [dirs, files] = splitFilesAndDirs(data);
	const sortedDirs = sortArrayByName(dirs);

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
							<Task key={item.name} path={item.path} />
							{index != files.length - 1 ? (
								<Box display="flex" justifyContent="flex-start">
									<Center height="40px" ml="60px" p="4px" zIndex={1}>
										<Divider
											borderColor={border}
											borderWidth={2}
											opacity={1}
											orientation="vertical"
											zIndex={0}
										/>
									</Center>
								</Box>
							) : null}
						</>
					);
				})}
			</Stack>
		</Box>
	);
}