'use client'

import React, { useState, useEffect } from 'react'

const Preloader: React.FC = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const handleLoad = () => setLoading(false)

		if (document.readyState === 'complete') {
			// This is a workaround to prevent the page from "flashing" when loading dark mode
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		} else {
			window.addEventListener('load', handleLoad)
			return () => window.removeEventListener('load', handleLoad)
		}
	}, [])

	if (!loading) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
			<div className="relative">
				<svg
					className="h-24 w-24 animate-spin"
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M50 10 L20 90 L90 35 L10 35 L80 90 Z"
						fill="none"
						stroke="#FF0000"
						strokeWidth="2"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="animate-pulse text-xl font-bold text-red-600">
						666
					</span>
				</div>
			</div>
		</div>
	)
}

export default Preloader
