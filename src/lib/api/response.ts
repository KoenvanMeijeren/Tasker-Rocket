export enum HttpStatusCode {
	Ok = 200,
	NotFound = 404,
}

export function assertResponse(
	response: Response,
	expectedHttpStatusCode: HttpStatusCode,
): boolean {
	return response.status === expectedHttpStatusCode.valueOf();
}

export function isResponseOk(response: Response): boolean {
	return assertResponse(response, HttpStatusCode.Ok);
}

export function isResponseNotFound(response: Response): boolean {
	return assertResponse(response, HttpStatusCode.NotFound);
}
