'use client'

import { useEffect } from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { config } from '@/config'
import { useNightMode } from '@/hooks/useNightMode'

type Params = {
	params: {
		name: string
	}
}

export default function Links({ params }: Params) {
	const { isNightMode, toggleNightMode } = useNightMode()

	const { name } = params

	const link =
		config.socials?.find(
			(social) => social.name.toLowerCase() === name.toLowerCase(),
		) ||
		config.links?.find((link) => link.name.toLowerCase() === name.toLowerCase())

	useEffect(() => {
		let countdown = 5
		const countdownElement = document.getElementById('countdown')

		const countdownInterval = setInterval(() => {
			countdown--
			if (countdownElement) {
				countdownElement.textContent = countdown.toString()
			}
			if (countdown === 0) {
				clearInterval(countdownInterval)
				if (link) {
					window.open(link.url, '_blank')
				}
			}
		}, 1000)

		return () => {
			clearInterval(countdownInterval)
		}
	}, [link])

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<main className={`container mx-auto flex-grow px-4 py-8`}>
				{link ?
					<div className={`flex h-screen flex-col items-center justify-center`}>
						<p className={`text-xl`}>
							Opening {link.name} in a new tab... (<span id="countdown">5</span>{' '}
							seconds)
						</p>
					</div>
				:	<div className={`flex h-screen flex-col items-center justify-center`}>
						<h1 className={`text-4xl font-bold`}>Link not found</h1>
					</div>
				}
			</main>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
