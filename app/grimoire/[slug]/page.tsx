import { getBlogPost } from '@/lib/blog'
import GrimoireContent from './GrimoireContent'
import { Metadata } from 'next'
import { config } from '@/config'

type Params = {
	params: {
		slug: string
	}
}

export default function GrimoirePage({ params }: Params) {
	const { slug } = params
	const blogPost = getBlogPost(slug)

	if (!blogPost) {
		return <div>No blog post found.</div>
	}

	return <GrimoireContent blogPost={blogPost} />
}

export function generateMetadata(): Metadata {
	return {
		title: `${config.name} | Grimoire`,
		openGraph: {
			title: `${config.name} | Grimoire`,
			description: 'My personal grimoire.',
		},
	}
}
