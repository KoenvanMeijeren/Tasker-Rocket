import {
	useDisclosure,
	Collapse,
	Box,
	Text,
	Divider,
} from '@chakra-ui/react';
import { Markdown } from '../markdown/Markdown';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import './task.css';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Colors } from '../../../theme.config';
import { useModeColors } from '@/hooks/useColors';
import { removeFileExtension } from '@/lib/utility/formatters';

export default function Task({ path }: { path: string }) {
	const { isOpen, onToggle } = useDisclosure();
	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const { backgroundColorSecondary: backgroundColor, fontColor, border } = useModeColors();

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
	const taskName = task.name.includes('.md') ? removeFileExtension(task.name) : task.name

	return (
		<Box
			zIndex={2}
			backgroundColor={backgroundColor}
			borderRadius={8}
			p={2}
			boxShadow={'0px 4px 10px -3px rgba(0, 0, 0, 0.07)'}
			outline={isOpen ? `5px solid ${border}` : `0px solid ${border}`}
			transition={'outline-width 200ms ease'}
		>
			{/* Task header (collapsible) */}
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
				<Box px={4}>
					<Box display={'flex'} justifyContent={'flex-end'}>
						<button className="btn btn-green">
							{
								<Box
									display='flex'
									alignItems={'center'}
									gap={'8px'}>
									<CheckCircleIcon color={'white'} />
									<Text fontWeight={'medium'} >Done</Text>
								</Box>
							}
						</button>
					</Box>
					<Markdown markdown={content}></Markdown>
				</Box>
			</Collapse>
		</Box>
	);
}
