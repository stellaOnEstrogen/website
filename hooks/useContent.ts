import { useState, useEffect, useCallback } from 'react'
import { Metadata } from '@/lib/content'

export interface ContentData {
	metadata: Metadata
	slug: string
	content: string
	exists: boolean
}

const contentCache: { [key: string]: ContentData } = {}

const fetchContent = async (path: string): Promise<ContentData> => {
	if (!path.startsWith('/')) {
		path = '/' + path
	}

	if (contentCache[path]) {
		return contentCache[path]
	}

	const res = await fetch(`/api/content?path=${path}`)
	if (!res.ok) {
		throw new Error('Failed to fetch content')
	}
	const data = await res.json()
	contentCache[path] = data
	return data
}

export const useContent = (path: string) => {
	const [content, setContent] = useState<ContentData | null>(
		() => contentCache[path] || null,
	)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(!content)

	const memoizedFetchContent = useCallback(() => {
		if (content) return

		setLoading(true)
		fetchContent(path)
			.then((data) => {
				setContent(data)
				setError(null)
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false))
	}, [path, content])

	useEffect(() => {
		memoizedFetchContent()
	}, [memoizedFetchContent])

	return { content, error, loading }
}