/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import TaskView from '@/components/project/TaskView';
import CollapsibleTask from '@/components/task/CollapsibleTask';
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Colors } from '../../../theme.config';
import { useColors } from '@/hooks/useColors';

export default function Task() {
	const path = '/22-23%20-%20Race%20Simulator%2FEpisode%201%2FLevel%201';
	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path)
	);
	const { backgroundColor, fontColor } = useColors();

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading) {
		return <div>laden...</div>;
	}

	if (!data) {
		return <div>Er kon geen content gevonden worden.</div>;
	}

	if (!Array.isArray(data)) {
		return <TaskView item={data}></TaskView>;
	}

	return (
		<div style={{ overflowY: 'auto', height: '100vh' }}>
			<Box px={'28px'} py={'24px'} backgroundColor={backgroundColor}>
				<Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
					Race Simulator
				</Text>
			</Box>
			<Stack
				display="block"
				flexDirection={'column'}
				alignItems={'flex-start'}
				mb={3}
				py={'36px'}
				px={'60px'}
			>
				{data.map((item: GitHubTreeItem) => {
					return (
						<CollapsibleTask key={item.name} path={item.path}></CollapsibleTask>
					);
				})}
			</Stack>
		</div>
	);
}
