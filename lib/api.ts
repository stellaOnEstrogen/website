import { NextResponse } from 'next/server'

/**
 * Creates a JSON response with a status code.
 * @param data The data to be returned in the response
 * @param status The status code of the response (default: 200)
 * @returns A NextResponse with JSON data and status code
 */
export function JsonResponse(data: object | string[], status: number = 200) {
	return NextResponse.json(data, { status })
}
