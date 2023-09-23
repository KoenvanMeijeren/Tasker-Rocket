import {
	useDisclosure,
	Collapse,
	Box,
	Text,
	useColorModeValue,
	Divider,
	Button,
} from '@chakra-ui/react';
import { Markdown } from '../markdown/Markdown';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import './collapsibleTask.css';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Colors } from '../../../theme.config';
import { useColors } from '@/hooks/useColors';
import { removeFileExtension, urlToFileExtension, urlToReadableString } from '@/lib/utility/formatters';

export default function CollapsibleTask({ path }: { path: string }) {
	const { isOpen, onToggle } = useDisclosure();
	const rotate = isOpen ? 'rotate(180deg)' : 'rotate(0)';
	const { backgroundColor, fontColor } = useColors();

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
	const taskName = removeFileExtension(task.name)

	return (
		<Box
			zIndex={2}
			backgroundColor={backgroundColor}
			borderRadius={8}
			p={2}
			boxShadow={'0px 4px 10px -3px rgba(0, 0, 0, 0.07)'}
			outline={isOpen ? '5px solid #E2E8F0' : '0px solid #E2E8F0'}
			transition={'outline-width 200ms ease'}
		>
			{/* Title bar (collapsible) */}
			<Box
				cursor={'pointer'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				onClick={onToggle}
			>
				<Box display={'flex'} alignItems={'center'} gap={'10px'}>
					<CheckCircleIcon boxSize={'20px'} color={Colors.green} />
					<Text fontSize={'18px'} className="noselect">
						{taskName}
					</Text>
				</Box>
				<Box>
					<ChevronDownIcon
						transform={rotate}
						transition={'all 0.2s linear'}
						boxSize={10}
						color={fontColor}
					/>
				</Box>
			</Box>

			{/* Content */}
			<Collapse in={isOpen}>
				<Divider my={4} borderWidth={1.5} />
				<Box display={'flex'} justifyContent={'flex-end'}>
					<button className="btn btn-blue">Done</button>
				</Box>
				<Markdown markdown={content}></Markdown>
			</Collapse>
		</Box>
	);
}
