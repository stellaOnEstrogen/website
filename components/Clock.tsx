'use client'

import * as React from 'react'
import { config } from '@/config'

const options: Intl.DateTimeFormatOptions = {
	timeZone: config.timezone,
	hour: 'numeric',
	minute: 'numeric',
	hour12: true,
}

interface ClockProps {
	useLocation?: boolean
}

export default function Clock({ useLocation }: ClockProps) {
	const [time, setTime] = React.useState(new Date())

	React.useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const formattedTime = new Intl.DateTimeFormat('en-US', options).format(time)

	return (
		<p className="text-pink-100">
			{useLocation ? `${config.location} • ` : ''}
			{formattedTime}
		</p>
	)
}
