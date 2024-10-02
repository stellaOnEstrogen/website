'use client'
import { useNightMode } from '@/hooks/useNightMode'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Content } from '@/components/ui/content'
import { useContent } from '@/hooks/useContent'

type Params = {
	params: {
		slug: string
	}
}

export default function NotesPage({ params }: Params) {
	const { slug } = params
	const { content, loading, error } = useContent(`notes/${slug}.md`)
	const { isNightMode, toggleNightMode } = useNightMode()

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!content) {
		return <div>No note file found.</div>
	}

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<main className="container mx-auto flex-grow px-4 py-8">
				<section id="notes" className="mb-12">
					<div>
						<div className="prose prose-invert max-w-none">
							<Content content={content} loading={loading} error={error} />
						</div>
					</div>
				</section>
			</main>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
