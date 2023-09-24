'use client';
import { useRouter } from 'next/router';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import Link from 'next/link';
import TaskView from '@/components/project/TaskView';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { Box, Center, Divider, GridItem, SimpleGrid, Stack } from '@chakra-ui/layout';
import { Card, CardBody } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';
import { isDir, isFile, splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { useModeColors } from '@/hooks/useColors';
import Task from '@/components/task/Task';
import { Content } from '@/components/Content';

export default function ProjectContent() {
 	const router = useRouter();
	const path = router.asPath.replace('/projecten', '');

	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path)
	);

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading) {
		return <div>laden...</div>;
	}

	if (!data) {
		return <div>Er kon geen content gevonden worden.</div>;
	}

	return (
		<Content data={data as GitHubTreeItem[]} />
	);
}
