import { useDisclosure, Collapse, Box, Text } from '@chakra-ui/react';
import { Markdown } from '../markdown/Markdown';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import './collapsibleTask.css';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function CollapsibleTask({ path }: { path: string }) {
	const { isOpen, onToggle } = useDisclosure();
	const rotate = isOpen ? 'rotate(180deg)' : 'rotate(0)';

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

	const task = data as GitHubTreeItem;

	const content = Buffer.from(task.content ?? '', 'base64').toString('utf8');

	return (
		<Box
			backgroundColor={'white'}
			borderRadius={8}
			p={4}
			mb={6}
			boxShadow={'0px 4px 10px -3px rgba(0, 0, 0, 0.07)'}
			outline={isOpen ? '5px solid #E2E8F0' : '0px solid #E2E8F0'}
			transition={'outline-width 200ms ease'}
		>
			<Box
				cursor={'pointer'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				onClick={onToggle}
			>
				<Text className="noselect">{task.name} </Text>

				<ChevronDownIcon
					transform={rotate}
					transition={'all 0.2s linear'}
					boxSize={10}
					color={'gray.600'}
				/>
			</Box>

			<Collapse in={isOpen}>
				<Markdown markdown={content}></Markdown>
			</Collapse>
		</Box>
	);
}
