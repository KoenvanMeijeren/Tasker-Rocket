import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { LanguageSupport } from '@codemirror/language';
import { sql } from '@codemirror/lang-sql';
import { java } from '@codemirror/lang-java';
import { sass } from '@codemirror/lang-sass';
import { cpp } from '@codemirror/lang-cpp';
import { hasKeyInMap } from '@/lib/utility/dataStructure';
import { php } from '@codemirror/lang-php';

export enum FileType {
	Code,
	Markdown,
	Image,
	Unsupported,
}

export interface CodeExtensions {
	[key: string]: LanguageSupport[];
}

export const codeExtensions: CodeExtensions = {
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
	php: [php()],
	txt: [],
	lock: [],
	editorconfig: [],
	env: [],
	example: [],
	gitattributes: [],
	gitignore: [],
	npmrc: [],
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

export const determineFileType = (fileExtension: string): FileType => {
	if (fileExtension === 'md') return FileType.Markdown;
	if (hasKeyInMap(codeExtensions, fileExtension)) return FileType.Code;
	if (hasKeyInMap(imageExtensions, fileExtension)) return FileType.Image;

	return FileType.Unsupported;
};
