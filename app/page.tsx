import { HomeComponent } from '@/components/pages/home'
import { generateMeta } from '@/lib/generateMeta'
import { Metadata } from 'next'

export const metadata: Metadata = generateMeta({
	title: 'Home',
})

export default function Home() {
	return <HomeComponent />
}
