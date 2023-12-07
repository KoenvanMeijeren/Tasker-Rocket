export function decodeURI(url: string): string {
    try {
        return decodeURIComponent(url);
    } catch (error) {
        // Silence the URIError which is thrown if encodedURI contains a % not followed by two
        // hexadecimal digits, or if the escape sequence does not encode a valid UTF-8 character.
        return '';
    }
}
