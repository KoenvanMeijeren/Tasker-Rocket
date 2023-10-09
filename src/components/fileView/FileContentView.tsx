import { useModeColors } from '@/hooks/useColors';
import { GitHubTreeItem } from '@/types/gitHubData';
import { useGitHubContentTree } from '@/lib/repository/gitHubRepository';
import {
	removeFileExtension,
	urlToFileExtension,
} from '@/lib/utility/formatters';
import {
	FileType,
	determineFileType,
	determineFileMimeType,
} from '@/types/extensions';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Collapse, Divider, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { colorConfig } from '../../../theme.config';
import ImageView from './ImageView';
import './fileContentView.css';
import { File } from '@/types/file';
import CodeView from '@/components/fileView/CodeView';
import PdfFileView from '@/components/fileView/PdfFileView';
import MarkdownView from '@/components/fileView/MarkdownView';

export default function FileContentView({ path }: { path: string }) {
	const { isOpen, onToggle } = useDisclosure();
	const [file, setFile] = useState<File | undefined>(undefined);

	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const { backgroundColorSecondary, fontColor, border } = useModeColors();

	const { data, error, isLoading } = useGitHubContentTree(
		decodeURIComponent(path),
	);
	const item = data as GitHubTreeItem;

	useEffect(() => {
		if (!item) return;
		const loadFile = () => {
			const extension = urlToFileExtension(item.name);
			const fileType = determineFileType(extension);
			const name =
				fileType === FileType.Markdown
					? removeFileExtension(item.name)
					: item.name;
			setFile({
				name,
				extension,
				content: item.content ?? '',
				fileType,
				mimeType: determineFileMimeType(extension) ?? '',
			});
		};

		loadFile();
	}, [item]);

	const content = useMemo(() => {
		if (!file) return;

		if (file.content.length < 1) {
			return <>Dit bestand is te groot om te bekijken.</>;
		}

		switch (file.fileType) {
			case FileType.Markdown:
				return <MarkdownView file={file} />;
			case FileType.Image:
				return <ImageView file={file} />;
			case FileType.Code:
				return <CodeView file={file} />;
			case FileType.Pdf:
				return <PdfFileView file={file} />;
			case FileType.Audio:
			case FileType.Video:
			case FileType.Docx:
			case FileType.PowerPoint:
			case FileType.Excel:
			case FileType.Unsupported:
				return <>De weergave van dit bestandstype wordt niet ondersteund.</>;
		}
	}, [file]);

	if (error) {
		return <div>laden mislukt...</div>;
	}

	if (isLoading || !file) {
		return null;
	}

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
						{file.name}
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
					{content}
				</Box>
			</Collapse>
		</Box>
	);
}
