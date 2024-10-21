import { cn } from '@/lib/utils'
import React, { useState, useEffect, useMemo } from 'react'
import markdownStyles from '@/app/styles/markdown.module.css'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { ContentData } from '@/hooks/useContent'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Loader2 } from 'lucide-react'

interface ContentProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
	content: ContentData | null
	loading?: boolean
	error?: string
}

const htmlProcessor = unified()
	.use(remarkParse)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeStringify)
	.use(remarkMath)
	.use(rehypeKatex)

const markdownToHtml = async (markdown: string) => {
	try {
		const result = await htmlProcessor.process(markdown)
		const htmlContent = result.toString()

		return htmlContent.replace(
			/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
			(_, language, code) => {
				const highlightedCode = hljs.highlight(code, { language }).value

				return `
          <div class="code-wrapper relative">
            <pre><code class="hljs code language-${language}">${highlightedCode}</code></pre>
            <button class="copy-button absolute top-2 right-2 p-2 bg-pink-200 text-pink-700 rounded-full">
              <span class="copy-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></span>
              <span class="check-icon hidden"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            </button>
          </div>
        `
			},
		)
	} catch (error) {
		console.error('Oopsie! Error processing markdown:', error)
		return `<p class="error">Oopsie! Error processing markdown: ${error instanceof Error ? error.message : String(error)}</p>`
	}
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	({ className, content, loading, error, ...props }, ref) => {
		const [htmlContent, sethtmlContent] = useState<string>('')

		useEffect(() => {
			if (content?.content) {
				markdownToHtml(content.content)
					.then(sethtmlContent)
					.catch((err) =>
						console.error('Oopsie! Error processing kawaii markdown:', err),
					)
			}
		}, [content])

		useEffect(() => {
			const btns = document.querySelectorAll('.copy-button')
			const handleCopyClick = (event: Event) => {
				const btn = event.currentTarget as HTMLElement
				const codeBlock = btn.closest('.code-wrapper')?.querySelector('code')
				if (codeBlock) {
					navigator.clipboard.writeText(codeBlock.textContent || '')
					const copyIcon = btn.querySelector('.copy-icon')
					const checkIcon = btn.querySelector('.check-icon')
					if (copyIcon && checkIcon) {
						copyIcon.classList.add('hidden')
						checkIcon.classList.remove('hidden')
						setTimeout(() => {
							copyIcon.classList.remove('hidden')
							checkIcon.classList.add('hidden')
						}, 2000)
					}
				}
			}

			btns.forEach((btn) => {
				btn.addEventListener('click', handleCopyClick)
			})

			return () => {
				btns.forEach((btn) => {
					btn.removeEventListener('click', handleCopyClick)
				})
			}
		}, [htmlContent])

		const memoizedContent = useMemo(
			() => <div dangerouslySetInnerHTML={{ __html: htmlContent }} />,
			[htmlContent],
		)

		if (loading) {
			return (
				<div className="text-center">
					<Loader2 size={32} className="animate-spin text-pink-600" />
				</div>
			)
		}

		return (
			<div
				ref={ref}
				className={cn('content p-6 pt-0', className, markdownStyles.markdown)}
				{...props}
			>
				{memoizedContent}
			</div>
		)
	},
)
Content.displayName = 'Content'
