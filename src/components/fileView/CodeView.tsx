import { codeExtensions } from '@/types/extensions';
import { File } from '@/types/file';
import CodeMirror from '@uiw/react-codemirror';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useModeColors } from '@/hooks/useColors';
import { useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyIcon } from '@chakra-ui/icons';
import { blobToString } from '@/lib/utility/dataStructure';

export default function CodeView({ file }: { file: File }) {
	const { codeMirror } = useModeColors();
	const [copied, setCopied] = useState(false);

	const content = useMemo(() => {
		return blobToString(file.content);
	}, [file]);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<Box className="pos-r">
			<Flex alignItems="center" justifyContent="flex-end" mb={2}>
				<CopyToClipboard onCopy={handleCopy} text={content}>
					<Button className="copy-btn" colorScheme="green" mr={2} size="sm">
						<CopyIcon mr={1} />
						{copied ? 'Copied!' : 'Copy'}
					</Button>
				</CopyToClipboard>
			</Flex>
			<CodeMirror
				editable={false}
				extensions={codeExtensions[file.extension]}
				theme={codeMirror}
				value={content}
			/>
		</Box>
	);
}
