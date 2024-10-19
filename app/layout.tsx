import type { Metadata } from 'next'
import './globals.css'
import { config } from '@/config'

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
			<body className={`font-sans antialiased`}>{children}</body>
		</html>
	)
}
