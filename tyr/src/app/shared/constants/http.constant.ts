/**
 * Http error codes from API
 *
 * @category Constant
 */
export const HttpErrorCode = {
	'TOKEN_NOT_VALID': 'token_not_valid'
}

/**
 * Http error details from API
 *
 * @category Constant
 */
export const HttpErrorDetail = {
	'NO_PERMISSION': 'You do not have permission to perform this action.'
}

/**
 * Http header configs from API
 *
 * @category Constant
 */
export const HttpHeaderConfig = {
	'ACCEPT': 'Accept',
	'AUTHORIZATION': 'Authorization',
	'ACCEPT_VALUE': '*/*',
	'TOKEN_PREFIX': 'Bearer',
	'CONTENT_TYPE': 'Content-Type',
	'CONTENT_TYPE_JSON': 'application/json'
}

/**
 * Http methods
 * 
 * @category Constant
 */
export const HttpMethod = {
	'GET': 'GET',
	'POST': 'POST',
	'PUT': 'PUT',
	'PATCH': 'PATCH',
	'DESTROY': 'DESTROY',
	'HEAD': 'HEAD',
	'JSONP': 'JSONP',
	'OPTIONS': 'OPTIONS'
}