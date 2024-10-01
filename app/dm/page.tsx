'use client'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useContent } from '@/hooks/useContent'
import { Content } from '@/components/ui/content'
import markdownStyles from '@/app/styles/markdown.module.css'
import { useNightMode } from '@/hooks/useNightMode'

export default function DM() {
	const { isNightMode, toggleNightMode } = useNightMode()

	const { content, loading, error } = useContent('pages/dm.md')

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<main
				className={`container mx-auto flex-grow px-4 py-8 ${markdownStyles.markdown}`}
			>
				<Content content={content} loading={loading} error={error} />
			</main>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
