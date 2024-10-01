'use client'

import Link from 'next/link'
import { Flame, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { config } from '@/config'
import { useEffect, useState, useRef } from 'react'

const AMBIENT_SOUND = '/assets/sounds/eerie-ambience-6836.mp3'

export default function Header({
	isNightMode,
	toggleNightMode,
}: {
	isNightMode: boolean
	toggleNightMode: () => void
}) {
	const [audioInitialized, setAudioInitialized] = useState(false)
	const ambientAudioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		ambientAudioRef.current = new Audio(AMBIENT_SOUND)
		ambientAudioRef.current.loop = true
		ambientAudioRef.current.volume = 0.3

		const initializeAudio = () => {
			if (!audioInitialized && ambientAudioRef.current) {
				ambientAudioRef.current
					.play()
					.then(() => setAudioInitialized(true))
					.catch((error) => console.error('Ambient audio play failed:', error))
			}
		}

		document.addEventListener('click', initializeAudio)

		return () => {
			document.removeEventListener('click', initializeAudio)
			if (ambientAudioRef.current) {
				ambientAudioRef.current.pause()
				ambientAudioRef.current = null
			}
		}
	}, [audioInitialized])

	const navLinks = [
		{ href: '/about', text: 'About' },
		{ href: '/grimoire', text: 'Grimoire' },
		{ href: '/dm', text: 'DM' },
	]

	return (
		<header
			className={`border-b ${isNightMode ? 'border-red-900' : 'border-gray-400'} sticky top-0 z-10 p-4 backdrop-blur-sm`}
		>
			<nav className="container mx-auto flex items-center justify-between">
				<Link href="/" className="flex items-center text-2xl font-bold">
					<Flame
						className={`mr-2 ${isNightMode ? 'text-red-500' : 'text-orange-500'}`}
					/>
					{config.name}
				</Link>
				<div className="flex items-center space-x-4">
					{navLinks.map(({ href, text }) => (
						<Link
							key={href}
							href={href}
							className="transition-colors hover:text-red-400"
						>
							{text}
						</Link>
					))}
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleNightMode}
						className={`rounded-full ${isNightMode ? 'bg-red-900 text-red-100' : 'bg-yellow-400 text-yellow-900'}`}
					>
						<Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</nav>
		</header>
	)
}
