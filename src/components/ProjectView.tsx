'use client';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { splitFilesAndDirs } from '@/lib/utility/dataStructure';
import { EnvOptions, getEnvValue } from '@/lib/utility/env';
import { Box, Stack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { FoldersSection } from './FoldersSection';
import VerticalDivider from './VerticalDivider';
import FileView from './fileView/FileView';

const repositoryName = getEnvValue(EnvOptions.GithubContentRepository)
	.split('/')
	.pop();

type Data = {
	dirs: GitHubTreeItem[];
	files: GitHubTreeItem[];
};

export function ProjectView({
	data,
	parent,
	openedFile,
}: {
	data: GitHubTreeItem[];
	parent: string;
	openedFile: string | null;
}) {
	const [content, setContent] = useState<Data | null>(null);

	useEffect(() => {
		if (data) {
			setContent(splitFilesAndDirs(data));
		}
	}, [data]);

	if (!content) {
		return null;
	}

	return (
		<Box>
			{content.dirs && content.dirs.length > 0 ? (
				<FoldersSection data={content.dirs} label={parent ?? repositoryName} />
			) : null}
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
						<Box key={item.url}>
							<FileView
								defaultIsOpen={item.name === openedFile}
								key={item.url}
								path={item.path}
							/>

							{index != content.files.length - 1 ? <VerticalDivider /> : null}
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
}
