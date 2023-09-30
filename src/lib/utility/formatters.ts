import { GitHubTreeItem } from '@/lib/repository/gitHubData';

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

export function sortArrayByName(items: GitHubTreeItem[]) {
	function compareNames(a: GitHubTreeItem, b: GitHubTreeItem) {
		// Extract the numeric part from the name using regular expressions
		const regex = /(\d+)/;
		const matchA = a.name.match(regex);
		const matchB = b.name.match(regex);
		const numA = parseInt(matchA ? matchA[0] : '', 10);
		const numB = parseInt(matchB ? matchB[0] : '', 10);

		// Compare the numeric parts
		if (numA < numB) {
			return -1;
		} else if (numA > numB) {
			return 1;
		} else {
			// If numeric parts are equal, compare the whole string
			return a.name.localeCompare(b.name);
		}
	}

	// Sort the array using the custom sorting function
	items.sort(compareNames);
	return items;
}
