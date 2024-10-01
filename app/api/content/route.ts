import { getContentItem, getContentFiles, extToType } from '@/lib/content'
import { JsonResponse } from '@/lib/api'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const path = searchParams.get('path')?.trim() || ''
	const useFile = searchParams.get('file') === 'true'

	if (!path) {
		return JsonResponse(getContentFiles())
	}

	const pathParts = path.split('/').filter(Boolean)
	const slug = pathParts.pop() || ''
	const cleanPath = pathParts.join('/')

	try {
		if (!slug.includes('.')) {
			return JsonResponse(getContentFiles(path))
		}

		const cleanSlug = slug.split('.')[0]
		const content = getContentItem(cleanPath, cleanSlug)

		if (!content) {
			return JsonResponse({ error: 'Content not found' }, 404)
		}

		if (!useFile) {
			return JsonResponse(content)
		} else {
			return new Response(content.content, {
				headers: {
					'Content-Type': `${extToType(slug)};charset=utf-8`,
				},
			})
		}
	} catch (error) {
		console.error('Error fetching content:', error)
		return JsonResponse({ error: 'Failed to fetch content' }, 500)
	}
}
