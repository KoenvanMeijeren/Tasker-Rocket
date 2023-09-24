'use client';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Center, Divider, Stack, Text } from '@chakra-ui/react';
import { useModeColors } from '@/hooks/useColors';
import { useRouter } from 'next/router';
import Task from '@/components/task/Task';

export default function TaskView() {
	 const pathHard = '/22-23%20-%20Race%20Simulator%2FEpisode%201%2FLevel%201';
	const router = useRouter();
	const path = router.asPath.replace('/task', '');
	console.log('curr' + path)
	console.log(pathHard)
	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path),
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
		<Box >
			<Box backgroundColor={backgroundColor} px="28px" py="24px">
				<Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
					Race Simulator
				</Text>
			</Box>
			<Stack
				alignItems="flex-start"
				display="block"
				flexDirection="column"
				mb={3}
				px="60px"
				py="36px"
			>
				{data.map((item: GitHubTreeItem, index) => {
					return (
						<>
							<Task key={item.name} path={item.path} />
							{index != data.length - 1 ? (
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
