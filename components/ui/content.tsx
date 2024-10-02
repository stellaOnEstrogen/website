import { cn } from '@/lib/utils'
import React, { useState, useEffect, useMemo } from 'react'
import markdownStyles from '@/app/styles/markdown.module.css'
import 'highlight.js/styles/github-dark.css'
import hljs from 'highlight.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { Skeleton } from '@/components/ui/skeleton'
import { ContentData } from '@/hooks/useContent'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

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
	.use(remarkMath)
	.use(rehypeKatex)

const markdownToHtml = async (markdown: string) => {
	try {
		const result = await processor.process(markdown)
		const htmlContent = result.toString()

		return htmlContent.replace(
			/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
			(_, language, code) => {
				const highlightedCode = hljs.highlight(code, { language }).value

				return `
					<div class="code-block-wrapper relative">
						<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>
						<button class="copy-button absolute top-2 right-2 p-2 bg-gray-700 text-white rounded">
							<span class="copy-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
							<span class="check-icon hidden"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
						</button>
					</div>
				`
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

		useEffect(() => {
			const copyButtons = document.querySelectorAll('.copy-button')
			copyButtons.forEach((button) => {
				button.addEventListener('click', () => {
					const codeBlock = button
						.closest('.code-block-wrapper')
						?.querySelector('code')
					if (codeBlock) {
						navigator.clipboard.writeText(codeBlock.textContent || '')
						const copyIcon = button.querySelector('.copy-icon')
						const checkIcon = button.querySelector('.check-icon')
						if (copyIcon && checkIcon) {
							copyIcon.classList.add('hidden')
							checkIcon.classList.remove('hidden')
							setTimeout(() => {
								copyIcon.classList.remove('hidden')
								checkIcon.classList.add('hidden')
							}, 2000)
						}
					}
				})
			})
		}, [htmlContent])

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
