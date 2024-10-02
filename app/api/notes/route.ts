import { JsonResponse } from '@/lib/api'
import { getNotePages, getNotePost, getNotePosts } from '@/lib/notes'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const getPages = searchParams.get('getPages') === 'true'
	const post = searchParams.get('post')
	const getPagesLimit = parseInt(searchParams.get('pLimit') || '10')

	if (getPages) {
		const pages = getNotePages(getPagesLimit)
		return JsonResponse({ data: pages })
	}

	try {
		const page = parseInt(searchParams.get('page') || '1')
		const limit = parseInt(searchParams.get('limit') || '10')

		if (post) {
			const postData = getNotePost(post)
			return JsonResponse({ data: postData })
		}

		const notePosts = getNotePosts(limit, page)
		return JsonResponse({ data: notePosts })
	} catch (error) {
		console.error('Error fetching notes:', error)
		return JsonResponse({ error: 'Failed to fetch notes' }, 500)
	}
}
