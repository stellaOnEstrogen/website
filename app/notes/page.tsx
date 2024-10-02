'use client'

import { useEffect, useState, Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText } from 'lucide-react'
import { NotePost } from '@/lib/notes'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Link from 'next/link'
import { useNightMode } from '@/hooks/useNightMode'

const getNotePosts = async (): Promise<NotePost[]> => {
	const res = await fetch('/api/notes')
	if (!res.ok) {
		throw new Error('Failed to fetch blog posts')
	}
	return res.json().then((data: { data: NotePost[] }) => data.data)
}

function NotesContent({ isNightMode }: { isNightMode: boolean }) {
	const [notePosts, setNotePosts] = useState<NotePost[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		getNotePosts()
			.then(setNotePosts)
			.catch((error) => console.error('Error fetching data:', error))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<main className="container mx-auto flex-grow px-4 py-8">
			<section id="blog" className="mb-12">
				<h2 className="mb-4 flex items-center text-3xl font-bold">
					<FileText className="mr-2" />
					Notes
				</h2>
				<div className="grid gap-4 md:grid-cols-2">
					{isLoading ?
						Array(4)
							.fill(0)
							.map((_, i) => (
								<Card
									key={i}
									className={`${isNightMode ? 'border-red-900 bg-gray-900' : 'border-gray-300 bg-white'}`}
								>
									<CardContent className="p-6">
										<Skeleton className="mb-2 h-6 w-3/4" />
										<Skeleton className="h-4 w-1/2" />
									</CardContent>
								</Card>
							))
					:	notePosts.map((post, i) => (
							<Card
								key={`${post.metadata.title}-${i}`}
								className={`${isNightMode ? 'border-red-900 bg-gray-900' : 'border-gray-300 bg-white'}`}
							>
								<CardContent className="p-6">
									<Link href={`/notes/${post.slug}`}>
										<h3
											className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'} mb-2 text-xl font-semibold`}
										>
											{post.metadata.title}
										</h3>
									</Link>
									<p
										className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}
									>
										{formatDate(post.metadata.publishedAt)}
									</p>
									<p
										className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'} mt-4 border-t border-gray-300 pt-4 text-sm`}
									>
										{post.metadata.summary}
									</p>
								</CardContent>
							</Card>
						))
					}
				</div>
			</section>
		</main>
	)
}

export default function Notes() {
	const { isNightMode, toggleNightMode } = useNightMode()

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<Suspense fallback={<div>Loading...</div>}>
				<NotesContent isNightMode={isNightMode} />
			</Suspense>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
