import { AllNotesComponent } from '@/components/pages/notes'
import { generateMeta } from '@/lib/generateMeta'
import { Metadata } from 'next'

export const metadata: Metadata = generateMeta({
	title: 'Notes',
	description: 'A collection of notes on various topics',
	path: '/notes',
})

// eslint-disable-next-line
export default function NotesIndex() {
	return <AllNotesComponent />
}
