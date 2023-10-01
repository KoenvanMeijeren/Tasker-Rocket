import { useModeColors } from '@/hooks/useColors';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import { removeFileExtension, urlToFileExtension } from '@/lib/utility/formatters';
import { FileType, codeExtensions, determineFileType } from '@/types/extensions';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
	Box,
	Collapse,
	Divider,
	Text,
	useDisclosure
} from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { Colors } from '../../../theme.config';
import GitHubImageView from '../GitHubImageView';
import { Markdown } from '../Markdown';
import './collapsible.css';

export default function Collapsible({ path }: { path: string }) {
	const { isOpen, onToggle } = useDisclosure();

	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const { backgroundColorSecondary, fontColor, border, codeMirror } = useModeColors();

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
	const fileExtension = urlToFileExtension(task.name)
	const content = Buffer.from(task.content ?? '', 'base64').toString('utf8');
	const isMarkdown = fileExtension === 'md';
	const taskName = isMarkdown ? removeFileExtension(task.name) : task.name

	const renderContent = () => {
		const fileType = determineFileType(fileExtension);
		switch (fileType) {
			case FileType.Markdown:
				return <Markdown markdown={content}></Markdown>
			case FileType.Image:
				return <GitHubImageView
					item={task}
					imageType={fileExtension}
				></GitHubImageView>
			case FileType.Code:
				return (
					<Box >
						<CodeMirror
							theme={codeMirror}
							editable={false}
							value={content}
							extensions={codeExtensions[fileExtension]}
						/>
					</Box>
				)
		}
	}

	return (
		<Box
			zIndex={2}
			backgroundColor={backgroundColorSecondary}
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
				px={4}

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
				<Box py={4} px={4}>
					<Box mb={6} display={'flex'} justifyContent={'flex-end'}>
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
					{renderContent()}
				</Box>
			</Collapse>
		</Box>
	);
}
