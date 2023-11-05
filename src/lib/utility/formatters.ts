export function urlToReadableString(url: string): string {
	const result = url.charAt(0).toUpperCase() + url.slice(1);

	return decodeURIComponent(result);
}

export function urlToFileExtension(url: string): string {
	return url.toLowerCase().split('.').pop()?.split('?')[0] ?? '';
}

export const removeFileExtension = (filename: string) =>
	filename.replace(/\.[^/.]+$/, '');

export function replaceAll(
	input: string,
	searchValues: string[] | RegExp[],
	replaceValue: string,
) {
	for (const searchValue of searchValues) {
		input = input.replaceAll(searchValue, replaceValue);
	}

	return input;
}

export function getFileNameFromUrl(url: string) {
	const parts = url.split('/');
	const name = parts[parts.length - 1];
	return name;
}

export const getParentFromUrl = (url: string) => {
	if (!url.includes('/')) return '';
	return url.split(/(.*\/)(.+)/)[1].replace(/\/$/, '');
};

export const removeQueryParamsFromURl = (url: string) => url.split('?')[0];
