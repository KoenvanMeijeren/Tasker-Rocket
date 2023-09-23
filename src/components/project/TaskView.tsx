import { GitHubTreeItem } from '@/lib/repository/gitHubData';
import CodeMirror from '@uiw/react-codemirror';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { Markdown } from '@/components/markdown/Markdown';
import { LanguageSupport } from '@codemirror/language';
import GitHubImageView from '@/components/project/GitHubImageView';
import { sql } from '@codemirror/lang-sql';
import { java } from '@codemirror/lang-java';
import { sass } from '@codemirror/lang-sass';
import { cpp } from '@codemirror/lang-cpp';
import {urlToFileExtension} from "@/lib/utility/formatters";
import {hasKeyInMap} from "@/lib/utility/dataStructure";

export interface CodeExtensions {
  [key: string]: LanguageSupport[];
}

const codeExtensions: CodeExtensions= {
  json: [json()],
  js: [javascript()],
  css: [css()],
  html: [html()],
  ts: [javascript({ typescript: true })],
  tsx: [javascript({ jsx: true, typescript: true })],
  sql: [sql()],
  cs: [java()],
  java: [java()],
  sass: [sass()],
  cpp: [cpp()],
};

export interface ImageExtensions {
	[key: string]: string;
}

export const imageExtensions: ImageExtensions = {
	jpg: 'image/jpg',
	jpeg: 'image/jpeg',
	gif: 'image/gif',
	svg: 'image/svg+xml',
	webp: 'image/webp',
	ico: 'image/ico',
	png: 'image/png',
	tiff: 'image/tiff',
};

export default function TaskView({ item } : {item: GitHubTreeItem}) {
	const [fileContent, setFileContent] = useState('');
	const [extension, setExtension] = useState<LanguageSupport[]>([]);
	const fileExtension = urlToFileExtension(item.url);

  useEffect(() => {
		setFileContent(
			Buffer.from(item.content ?? '', 'base64').toString('utf8')
		);

		setExtension(codeExtensions[fileExtension] || []);
	}, [item, fileExtension]);

	const codeMirrorTheme = useColorModeValue(githubLight, githubDark);

	if (fileExtension === 'md') {
		return <Markdown markdown={fileContent}></Markdown>;
	}

	if (hasKeyInMap(imageExtensions, fileExtension)) {
		return (
			<GitHubImageView
				item={item}
				imageType={fileExtension}
			></GitHubImageView>
		);
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
