import { DMComponent } from '@/components/pages/dm'
import { generateMeta } from '@/lib/generateMeta'
import { Metadata } from 'next'

export const metadata: Metadata = generateMeta({
	title: 'Message Rules',
	description: 'Rules for sending messages to me',
	path: '/dm',
})

// eslint-disable-next-line
export default function DM() {
	return <DMComponent />
}
