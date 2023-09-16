import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import CodeMirror from '@uiw/react-codemirror';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { useMemo, useState } from 'react';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { Markdown } from '@/components/markdown/Markdown';
import { LanguageSupport } from '@codemirror/language';

export default function TaskView(params: { item: GitHubTreeItem }) {
	const [fileContent, setFileContent] = useState('');
	const [extension, setExtension] = useState<LanguageSupport[]>([]);
	const fileExtension = params.item.url.split('.').pop()?.split('?')[0] ?? '';

	useMemo(() => {
		setFileContent(
			Buffer.from(params.item.content ?? '', 'base64').toString('utf8')
		);
		switch (fileExtension) {
			case 'json':
				setExtension([json()]);
				break;
			case 'js':
				setExtension([javascript()]);
				break;
			case 'css':
				setExtension([css()]);
				break;
			case 'html':
				setExtension([html()]);
				break;
			case 'ts':
				setExtension([
					javascript({
						typescript: true,
					}),
				]);
				break;
			case 'tsx':
				setExtension([
					javascript({
						jsx: true,
						typescript: true,
					}),
				]);
				break;
		}
	}, [params, fileExtension]);

	const codeMirrorTheme = useColorModeValue(githubLight, githubDark);

	if (fileExtension === 'md') {
		return <Markdown markdown={fileContent}></Markdown>;
	}

	return (
		<Box minWidth="200px" maxWidth="980px" m="auto">
			<CodeMirror
				theme={codeMirrorTheme}
				editable={false}
				value={fileContent}
				extensions={extension}
			/>
		</Box>
	);
}
