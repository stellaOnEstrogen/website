import { cn } from '@/lib/utils'
import React, { useState, useEffect, useMemo } from 'react'
import markdownStyles from '@/app/styles/markdown.module.css'
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { Skeleton } from '@/components/ui/skeleton'
import { ContentData } from '@/hooks/useContent'

interface ContentProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
	content: ContentData | null
	loading: boolean
	error: string | null
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

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
	({ className, content, loading, error, ...props }, ref) => {
		const [htmlContent, setHtmlContent] = useState<string>('')

		useEffect(() => {
			if (content?.content) {
				markdownToHtml(content.content)
					.then(setHtmlContent)
					.catch((err) => console.error('Error processing markdown:', err))
			}
		}, [content])

		const memoizedContent = useMemo(
			() => <div dangerouslySetInnerHTML={{ __html: htmlContent }} />,
			[htmlContent],
		)

		if (loading) {
			return <Skeleton className="h-64 w-full" />
		}

		if (error) {
			return <div className="text-red-500">Error: {error}</div>
		}

		return (
			<div
				ref={ref}
				className={cn('p-6 pt-0', className, markdownStyles.markdown)}
				{...props}
			>
				{memoizedContent}
			</div>
		)
	},
)
Content.displayName = 'Content'
