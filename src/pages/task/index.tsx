'use client';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import TaskView from '@/components/project/TaskView';
import {
	Box,
	Center,
	Divider,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useModeColors } from '@/hooks/useColors';
import { Colors } from '../../../theme.config';
import Task from '@/components/task/Task';
import path from 'path';

export default function TaskView() {
	const path = '/22-23%20-%20Race%20Simulator%2FEpisode%201%2FLevel%201';
	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path)
	);
	const { backgroundColor, border } = useModeColors();

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
		return <div>Er ging iets fout...</div>;
	}

	return (
		<div style={{ overflowY: 'scroll', height: '100vh' }}>
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
				{data.map((item: GitHubTreeItem, index) => {
					return (
						<>
							<Task
								key={item.name}
								path={item.path}
							></Task>
							{index != data.length - 1 && (
								<Box display={'flex'} justifyContent={'flex-start'}>
									<Center p={'4px'} zIndex={1} height={'40px'} ml={'60px'}>
										<Divider
											zIndex={0}
											orientation="vertical"
											borderWidth={2}
											borderColor={border}
											opacity={1}
										/>
									</Center>
								</Box>
							)}
						</>
					);
				})}
			</Stack>
		</div>
	);
}
