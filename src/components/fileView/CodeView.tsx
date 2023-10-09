import { codeExtensions } from '@/types/extensions';
import { File } from '@/types/file';
import CodeMirror from '@uiw/react-codemirror';
import { Box } from '@chakra-ui/react';
import { useModeColors } from '@/hooks/useColors';

export default function CodeView({ file }: { file: File }) {
	const { codeMirror } = useModeColors();

	return (
		<Box>
			<CodeMirror
				editable={false}
				extensions={codeExtensions[file.extension]}
				theme={codeMirror}
				value={file.content}
			/>
		</Box>
	);
}
