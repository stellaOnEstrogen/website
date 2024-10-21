import { AboutComponent } from '@/components/pages/about'
import { generateMeta } from '@/lib/generateMeta'
import { Metadata } from 'next'

export const metadata: Metadata = generateMeta({
	title: 'About Me',
	description: 'Learn more about me and my work',
	path: '/about',
})

// eslint-disable-next-line
export default function About() {
	return <AboutComponent />
}
