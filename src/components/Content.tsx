
'use client';
import Link from 'next/link';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Center, Divider, GridItem, SimpleGrid, Stack } from '@chakra-ui/layout';
import { Card, CardBody } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { useModeColors } from '@/hooks/useColors';
import Task from '@/components/task/Task';

export function Content({data}: {data:GitHubTreeItem[]}) {
	const { backgroundColor, border } = useModeColors();
	const [dirs, files] = splitFilesAndDirs(data);
    return (
		<Box >
		<SimpleGrid
			templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
			spacing={4}
			padding={4}
			backgroundColor={backgroundColor} px="28px" py="24px"
		>
			{dirs.map((item: GitHubTreeItem) => {
				return (
					<GridItem key={item.url}>
						<Link href={`/${encodeURIComponent(item.path)}`}>
							<Card>
								<CardBody>
									<Text>{item.name}</Text>
								</CardBody>
							</Card>
						</Link>
					</GridItem>
				);
			})}
		</SimpleGrid>
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