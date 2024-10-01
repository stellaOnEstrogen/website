'use client'

import { useNightMode } from '@/hooks/useNightMode'
import Book from '@/components/book'
import { BlogPost } from '@/lib/blog'
import Header from '@/components/header'
import Footer from '@/components/footer'
import markdownStyles from '@/app/styles/markdown.module.css'
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { useEffect, useState } from 'react'

interface GrimoireContentProps {
	blogPost: BlogPost
}

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeStringify)

const markdownToHtml = async (markdown: string) => {
	try {
		const result = await processor.process(markdown)
		const htmlContent = result.toString()

		return htmlContent.replace(
			/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
			(_, language, code) => {
				const highlightedCode = hljs.highlight(code, { language }).value
				return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`
			},
		)
	} catch (error) {
		console.error('Error processing markdown:', error)
		return `<p>Error processing markdown: ${error instanceof Error ? error.message : String(error)}</p>`
	}
}

export default function GrimoireContent({ blogPost }: GrimoireContentProps) {
	const { isNightMode, toggleNightMode } = useNightMode()

	const [htmlContent, setHtmlContent] = useState<string>('')

	useEffect(() => {
		if (blogPost.content) {
			markdownToHtml(blogPost.content)
				.then(setHtmlContent)
				.catch((err) => console.error('Error processing markdown:', err))
		}
	}, [blogPost.content])

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<main className="container mx-auto flex-grow px-4 py-8">
				<section id="blog" className="mb-12">
					<div>
						<Book
							title={blogPost.metadata.title}
							content={htmlContent}
							isLight={!isNightMode}
							contentClassNames={
								isNightMode ?
									markdownStyles.markdown
								:	markdownStyles['markdown-light']
							}
						/>
					</div>
				</section>
			</main>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
