import { codeExtensions } from '@/types/extensions';
import { File } from '@/types/file';
import CodeMirror from '@uiw/react-codemirror';
import { Box } from '@chakra-ui/react';
import { useModeColors } from '@/hooks/useColors';
import { useMemo } from 'react';

export default function CodeView({ file }: { file: File }) {
	const { codeMirror } = useModeColors();

	const content = useMemo(() => {
		return Buffer.from(file.content, 'base64').toString('utf8');
	}, [file]);

	return (
		<Box>
			<CodeMirror
				editable={false}
				extensions={codeExtensions[file.extension]}
				theme={codeMirror}
				value={content}
			/>
		</Box>
	);
}
