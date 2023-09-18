export function urlToReadableString(url: string): string {
	const result = url.charAt(0).toUpperCase() + url.slice(1);

	return decodeURIComponent(result);
}

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
