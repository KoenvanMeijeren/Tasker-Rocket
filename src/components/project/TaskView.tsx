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
import GitHubImageView from '@/components/project/GitHubImageView';

function fileExtensionToCodeMirrorExtension(fileExtension: string) {
	switch (fileExtension) {
		case 'json':
			return [json()];
		case 'js':
			return [javascript()];
		case 'css':
			return [css()];
		case 'html':
			return [html()];
		case 'ts':
			return [
				javascript({
					typescript: true,
				}),
			];
		case 'tsx':
			return [
				javascript({
					jsx: true,
					typescript: true,
				}),
			];
	}

	return [];
}

export default function TaskView(params: { item: GitHubTreeItem }) {
	const [fileContent, setFileContent] = useState('');
	const [extension, setExtension] = useState<LanguageSupport[]>([]);
	const fileExtension = params.item.url.split('.').pop()?.split('?')[0] ?? '';
	const imageExtensions = [
		'jpg',
		'jpeg',
		'gif',
		'svg',
		'webp',
		'ico',
		'png',
		'tiff',
	];

	useMemo(() => {
		setFileContent(
			Buffer.from(params.item.content ?? '', 'base64').toString('utf8')
		);

		setExtension(fileExtensionToCodeMirrorExtension(fileExtension));
	}, [params]);

	const codeMirrorTheme = useColorModeValue(githubLight, githubDark);

	if (fileExtension === 'md') {
		return <Markdown markdown={fileContent}></Markdown>;
	}

	if (imageExtensions.includes(fileExtension)) {
		return <GitHubImageView item={params.item}></GitHubImageView>;
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
