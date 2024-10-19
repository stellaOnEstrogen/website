"use client"

import { Cherry, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

function randomizeBackground() {
	const items = [
		{
			icon: Cherry,
			color: 'text-pink-300',
		},
		{
			icon: Heart,
			color: 'text-red-300',
		}
	]

	const MAX_ITEMS = 20

	return [...Array(MAX_ITEMS)].map((_, i) => {
		const item = items[Math.floor(Math.random() * items.length)]
		return (
			<item.icon
				key={i}
				className={`animate-fall absolute ${item.color}`}
				style={{
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
					animationDuration: `${Math.random() * 10 + 5}s`,
					animationDelay: `${Math.random() * 5}s`,
				}}
			/>
		)
	})
}


export function Background() {
	const [background, setBackground] = useState<JSX.Element[]>([])

	useEffect(() => {
		setBackground(randomizeBackground())
	}, [])

	return (
		<>
			{background}
		</>
	)
}