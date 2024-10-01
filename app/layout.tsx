import type { Metadata } from 'next'
import './globals.css'
import { config } from '@/config'
import Preloader from '@/components/preloader'
import Cursors from '@/components/cursors'

export const metadata: Metadata = {
	title: config.name,
	description: config.about,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type={
						config.avatar.split('.').pop() === 'svg' ?
							'image/svg+xml'
						:	`image/${config.avatar.split('.').pop()}`
					}
					href={config.avatar}
				/>
			</head>
			<body className={`font-sans antialiased`}>
				<Preloader />
				<Cursors />
				{children}
			</body>
		</html>
	)
}
