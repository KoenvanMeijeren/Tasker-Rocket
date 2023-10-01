import { useModeColors } from '@/hooks/useColors';
import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import {
	removeFileExtension,
	urlToFileExtension,
} from '@/lib/utility/formatters';
import {
	FileType,
	codeExtensions,
	determineFileType,
} from '@/types/extensions';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Divider, Text, useDisclosure } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { colorConfig } from '../../../theme.config';
import GitHubImageView from '../GitHubImageView';
import { Markdown } from '../markdown/Markdown';
import './collapsible.css';

export default function Collapsible({ path }: { path: string }) {
	const { isOpen, onToggle } = useDisclosure();

	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const { backgroundColorSecondary, fontColor, border, codeMirror } =
		useModeColors();

	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path),
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
	const fileExtension = urlToFileExtension(task.name);
	const content = Buffer.from(task.content ?? '', 'base64').toString('utf8');
	const isMarkdown = fileExtension === 'md';
	const taskName = isMarkdown ? removeFileExtension(task.name) : task.name;

	const renderContent = () => {
		const fileType = determineFileType(fileExtension);
		switch (fileType) {
			case FileType.Markdown:
				return <Markdown markdown={content} />;
			case FileType.Image:
				return <GitHubImageView imageType={fileExtension} item={task} />;
			case FileType.Code:
				return (
					<Box>
						<CodeMirror
							editable={false}
							extensions={codeExtensions[fileExtension]}
							theme={codeMirror}
							value={content}
						/>
					</Box>
				);
			case FileType.Unsupported:
				return <>De weergave van dit bestandstype wordt niet ondersteund.</>;
		}
	};

	return (
		<Box
			backgroundColor={backgroundColorSecondary}
			borderRadius={8}
			boxShadow="0px 4px 10px -3px rgba(0, 0, 0, 0.07)"
			outline={isOpen ? `5px solid ${border}` : `0px solid ${border}`}
			p={2}
			transition="outline-width 200ms ease"
			zIndex={2}
		>
			{/* Task header (collapsible) */}
			<Box
				alignItems="center"
				cursor="pointer"
				display="flex"
				justifyContent="space-between"
				onClick={onToggle}
				px={4}
			>
				<Box alignItems="center" display="flex" gap="10px">
					<CheckCircleIcon boxSize="20px" color={colorConfig.green} />
					<Text className="noselect" fontSize="18px">
						{taskName}
					</Text>
				</Box>
				<Box>
					<ChevronDownIcon
						boxSize={10}
						color={fontColor}
						transform={rotate}
						transition="all 0.2s linear"
					/>
				</Box>
			</Box>

			{/* Content */}
			<Collapse in={isOpen}>
				<Divider borderWidth={1.5} my={4} />
				<Box px={4} py={4}>
					<Box display="flex" justifyContent="flex-end" mb={6}>
						<button className="btn btn-green" type="button">
							<Box alignItems="center" display="flex" gap="8px">
								<CheckCircleIcon color="white" />
								<Text fontWeight="medium">Done</Text>
							</Box>
						</button>
					</Box>
					{renderContent()}
				</Box>
			</Collapse>
		</Box>
	);
}
