import { decodeUrl } from '@/lib/utility/uri';

export function urlToReadableString(url: string): string {
    const result = url.charAt(0).toUpperCase() + url.slice(1);

    return decodeUrl(result);
}

export function urlToFileExtension(url: string): string {
    return url.toLowerCase().split('.').pop()?.split('?')[0] ?? '';
}

export const removeFileExtension = (filename: string) =>
    filename.replace(/\.[^/.]+$/, '');

export function replaceAll(
    input: string,
    searchValues: string[] | RegExp[],
    replaceValue: string
) {
    for (const searchValue of searchValues) {
        input = input.replaceAll(searchValue, replaceValue);
    }

    return input;
}

export function getFileNameFromUrl(url: string) {
    const parts = url.split('/');
    return parts[parts.length - 1];
}

export const getParentFromUrl = (url: string) => {
    if (!url.includes('/')) return '';
    return url.split(/(.*\/)(.+)/)[1].replace(/\/$/, '');
};

export const removeQueryParamsFromURl = (url: string) => url.split('?')[0];

// Temporary function to extract 2 sensible characters from the name until we have configurable
// icons for folders and files. They will be shown instead.
export const nameToLogo = (name: string) => {
    const lettersOnly = name.replace(/[^a-zA-Z\s]/g, '').trim();
    const words = lettersOnly.split(/\s+/);

    let result = '';
    if (words.length > 1) {
        result = words
            .slice(0, 2)
            .map((word) => word[0])
            .join('');
    } else if (lettersOnly.length > 1) {
        result = lettersOnly.slice(0, 2);
    } else if (name.length > 0) {
        result = name.slice(0, 2);
    }

    return result.toUpperCase();
};
