'use client'

import { useState, useEffect, useCallback } from 'react'

export const useNightMode = () => {
	const [isNightMode, setIsNightMode] = useState(() => {
		if (typeof window !== 'undefined') {
			const storedMode = localStorage.getItem('nightMode')
			return storedMode !== null ? storedMode === 'true' : true
		}
		return true
	})

	const setMode = useCallback((mode: boolean) => {
		setIsNightMode(mode)
		if (typeof window !== 'undefined') {
			localStorage.setItem('nightMode', mode.toString())
		}
	}, [])

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (e: MediaQueryListEvent) => setMode(e.matches)

		mediaQuery.addListener(handleChange)
		return () => mediaQuery.removeListener(handleChange)
	}, [setMode])

	const toggleNightMode = useCallback(
		() => setMode(!isNightMode),
		[isNightMode, setMode],
	)

	return { isNightMode, toggleNightMode }
}
