import { hasKeyInMap } from '@/lib/utility/dataStructure';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { php } from '@codemirror/lang-php';
import { sass } from '@codemirror/lang-sass';
import { sql } from '@codemirror/lang-sql';
import { LanguageSupport } from '@codemirror/language';

export enum FileType {
    Code,
    Pdf,
    Markdown,
    Image,
    Audio,
    Video,
    Docx,
    PowerPoint,
    Excel,
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
    yml: [],
};

export interface FileExtensionInfo {
    type: FileType;
    mimeType: string;
}

const fileExtensionsInfoMap = new Map<string, FileExtensionInfo>([
    ['md', { type: FileType.Markdown, mimeType: 'text/plain' }],
    ['pdf', { type: FileType.Pdf, mimeType: 'application/pdf' }],
    ['jpg', { type: FileType.Image, mimeType: 'image/jpg' }],
    ['jpeg', { type: FileType.Image, mimeType: 'image/jpeg' }],
    ['gif', { type: FileType.Image, mimeType: 'image/gif' }],
    ['svg', { type: FileType.Image, mimeType: 'image/svg+xml' }],
    ['webp', { type: FileType.Image, mimeType: 'image/webp' }],
    ['ico', { type: FileType.Image, mimeType: 'image/ico' }],
    ['png', { type: FileType.Image, mimeType: 'image/png' }],
    ['tiff', { type: FileType.Image, mimeType: 'image/tiff' }],
    ['doc', { type: FileType.Docx, mimeType: 'application/msword' }],
    [
        'docx',
        {
            type: FileType.Docx,
            mimeType:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
    ],
    [
        'ppt',
        {
            type: FileType.PowerPoint,
            mimeType: 'application/vnd.ms-powerpoint',
        },
    ],
    [
        'pptx',
        {
            type: FileType.PowerPoint,
            mimeType:
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        },
    ],
    [
        'odp',
        {
            type: FileType.PowerPoint,
            mimeType: 'application/vnd.oasis.opendocument.presentation',
        },
    ],
    ['xls', { type: FileType.Excel, mimeType: 'application/vnd.ms-excel' }],
    [
        'xlsx',
        {
            type: FileType.Excel,
            mimeType:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
    ],
    [
        'ods',
        {
            type: FileType.Excel,
            mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
        },
    ],
    ['mp3', { type: FileType.Audio, mimeType: 'audio/mpeg' }],
    ['wav', { type: FileType.Audio, mimeType: 'audio/wav' }],
    ['avi', { type: FileType.Video, mimeType: 'video/x-msvideo' }],
    ['mp4', { type: FileType.Video, mimeType: 'video/mp4' }],
    ['webm', { type: FileType.Video, mimeType: 'audio/webm' }],
]);

export const fileExtensionsInfo: Map<string, FileExtensionInfo> =
    fileExtensionsInfoMap;

export const findFileInfo = (fileExtension: string): FileExtensionInfo => {
    const extension = fileExtension.toLowerCase();

    if (hasKeyInMap(codeExtensions, extension)) {
        return { type: FileType.Code, mimeType: 'text/plain' };
    }

    if (fileExtensionsInfoMap.has(extension)) {
        return fileExtensionsInfoMap.get(extension)!;
    }

    return { type: FileType.Unsupported, mimeType: 'application/octet-stream' };
};
