import { JsonResponse } from '@/lib/api'
import { getBlogPages, getBlogPost, getBlogPosts } from '@/lib/blog'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const getPages = searchParams.get('getPages') === 'true'
	const post = searchParams.get('post')
	const getPagesLimit = parseInt(searchParams.get('pLimit') || '10')

	if (getPages) {
		const pages = getBlogPages(getPagesLimit)
		return JsonResponse({ data: pages })
	}

	try {
		const page = parseInt(searchParams.get('page') || '1')
		const limit = parseInt(searchParams.get('limit') || '10')

		if (post) {
			const postData = getBlogPost(post)
			return JsonResponse({ data: postData })
		}

		const blogPosts = getBlogPosts(limit, page)
		return JsonResponse({ data: blogPosts })
	} catch (error) {
		console.error('Error fetching blog posts:', error)
		return JsonResponse({ error: 'Failed to fetch blog posts' }, 500)
	}
}
