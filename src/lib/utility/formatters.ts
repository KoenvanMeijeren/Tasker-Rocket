import { decodeURI } from '@/lib/utility/uri';

export function urlToReadableString(url: string): string {
    const result = url.charAt(0).toUpperCase() + url.slice(1);

    return decodeURI(result);
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

//temporary function to extract 2 sensible characters from the name until we have configurable icons for folders and files. They will be shown instead.
export const nameToLogo = (name: string) => {
    const containsOnlyNumbers = /^[0-9]+$/.test(name);

    const lettersOnly = containsOnlyNumbers
        ? name.trim()
        : name.replace(/[^a-zA-Z\s]/g, '').trim(); // Remove non-letter characters except spaces
    const words = lettersOnly.split(' ');

    let result = '';
    if (words.length > 1) {
        for (let i = 0; i < words.length && result.length < 2; i++) {
            const word = words[i];
            if (word.length > 0) {
                result += word[0];
            }
        }
    } else if (lettersOnly.length > 2) {
        result =
            lettersOnly[0] + lettersOnly[Math.floor(lettersOnly.length / 2)];
    } else {
        result = lettersOnly;
    }

    return result.toUpperCase(); // Ensure the heading is in uppercase
};
