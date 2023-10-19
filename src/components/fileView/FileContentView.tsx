import { useModeColors } from '@/hooks/useColors';
import { useGitHubBlobContent } from '@/lib/repository/gitHubRepository';
import {
	removeFileExtension,
	urlToFileExtension,
} from '@/lib/utility/formatters';
import { FileType, findFileInfo } from '@/types/extensions';
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
	Box,
	Collapse,
	Divider,
	Icon,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { colorConfig } from '../../../theme.config';
import ImageView from './ImageView';
import './fileContentView.css';
import { File } from '@/types/file';
import CodeView from '@/components/fileView/CodeView';
import PdfFileView from '@/components/fileView/PdfFileView';
import MarkdownView from '@/components/fileView/MarkdownView';
import AudioView from '@/components/fileView/AudioView';
import VideoView from '@/components/fileView/VideoView';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { gitHubTreeItemsActions } from '@/lib/store/githubItemState/slice';
import { RiTodoFill } from 'react-icons/ri';

export default function FileContentView({
	uniqueKey,
	name,
	contentUrl,
}: {
	uniqueKey: string;
	name: string;
	contentUrl: string;
}) {
	const storeDispatcher = useAppDispatch();
	const { isOpen, onToggle } = useDisclosure();
	const [file, setFile] = useState<File | undefined>(undefined);

	const rotate = isOpen ? 'rotate(-180deg)' : 'rotate(0)';
	const { backgroundColorSecondary, fontColor, border } = useModeColors();

	const { data, error, isLoading } = useGitHubBlobContent(contentUrl);

	const itemsState = useAppSelector((state) => state.itemsState);
	const isItemCompleted = itemsState.items[uniqueKey] ?? false;

	const handleTaskCompleterClick = () => {
		storeDispatcher(
			gitHubTreeItemsActions.changeState({
				key: uniqueKey,
				completed: !(itemsState.items[uniqueKey] ?? false),
			}),
		);
	};

	useEffect(() => {
		if (!data) return;

		const extension = urlToFileExtension(name);
		const fileInfo = findFileInfo(extension);
		const itemName =
			fileInfo.type === FileType.Markdown ? removeFileExtension(name) : name;

		setFile({
			name: itemName,
			extension,
			content: data,
			fileType: fileInfo.type,
			mimeType: fileInfo.mimeType,
		});
	}, [data, name]);

	const content = useMemo(() => {
		if (!file) return;

		if (file.content.length < 1) {
			return <>Dit bestand bevat geen content.</>;
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
				return <AudioView file={file} />;
			case FileType.Video:
				return <VideoView file={file} />;
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
					{isItemCompleted ? (
						<CheckCircleIcon color={colorConfig.green} />
					) : null}
					{!isItemCompleted ? (
						<Icon as={RiTodoFill} color={colorConfig.blue} />
					) : null}
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
						<button
							className={isItemCompleted ? 'btn btn-danger' : 'btn btn-green'}
							onClick={handleTaskCompleterClick}
							type="button"
						>
							<Box alignItems="center" display="flex" gap="8px">
								{!isItemCompleted ? <CheckCircleIcon color="white" /> : null}
								{isItemCompleted ? (
									<Icon as={RiTodoFill} color="white" />
								) : null}
								<Text fontWeight="medium">
									{isItemCompleted ? 'Actief maken' : 'Done'}
								</Text>
							</Box>
						</button>
					</Box>
					{content}
				</Box>
			</Collapse>
		</Box>
	);
}
