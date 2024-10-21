'use client'

import Layout from '../Layout'
import { Content } from '@/components/content'
import { useContent } from '@/hooks/useContent'
import * as React from 'react'
import { Loader2 } from 'lucide-react'

// Define the type for a Note
interface Note {
	slug: string
	metadata: {
		title: string
	}
}

export function AllNotesComponent(): JSX.Element {
	const [notes, setNotes] = React.useState<Note[]>([])
	const [loading, setLoading] = React.useState<boolean>(true)

	React.useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await fetch('/api/content?path=notes')
				const noteSlugs: string[] = await response.json()

				const fetchedNotes = await Promise.all(
					noteSlugs.map(async (slug) => {
						const noteData = await fetch(`/api/content?path=notes/${slug}`)
						return noteData.json()
					}),
				)

				setNotes(fetchedNotes)
			} catch (error) {
				console.error('Error fetching notes:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchNotes()
	}, [])

	const uniqueNotes = React.useMemo(
		() =>
			notes.filter(
				(note, index, self) =>
					index === self.findIndex((t) => t.slug === note.slug),
			),
		[notes],
	)

	if (loading) {
		return (
			<Layout>
				<p className="text-center text-pink-600">
					<Loader2 className="mr-2 inline-block h-6 w-6 animate-spin" />
					Loading...
				</p>
			</Layout>
		)
	}

	if (uniqueNotes.length === 0) {
		return (
			<Layout>
				<p className="text-center text-pink-600">No notes found</p>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="space-y-4">
				<h2 className="text-center text-2xl font-bold text-pink-600">
					Notes (^・ω・^)
				</h2>
				<div className="grid grid-cols-2 gap-4">
					{uniqueNotes.map((note) => (
						<a
							key={note.slug}
							href={`/notes/${note.slug}`}
							className="flex items-center justify-center rounded-lg bg-pink-100 p-4 text-pink-600 transition-colors hover:bg-pink-200"
						>
							{note.metadata.title}
						</a>
					))}
				</div>
			</div>
		</Layout>
	)
}

export function NotesComponent({ slug }: { slug: string }): JSX.Element {
	const { content, error, loading } = useContent(`notes/${slug}.md`)

	return (
		<Layout>
			<div className="space-y-4">
				<h2 className="text-center text-2xl font-bold text-pink-600">
					Notes (^・ω・^)
				</h2>
				{loading ?
					<p className="text-center text-pink-600">
						<Loader2 className="mr-2 inline-block h-6 w-6 animate-spin" />
						Loading...
					</p>
				: error ?
					<p className="text-center text-red-600">Error: {error}</p>
				:	<Content content={content} className="text-sm" />}
			</div>
		</Layout>
	)
}
