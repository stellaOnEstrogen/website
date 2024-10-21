'use client'

import Layout from '../Layout'
import { config } from '@/config'

export function SocialsComponent() {
	return (
		<Layout>
			<div className="space-y-6">
				<h2 className="text-center text-2xl font-bold text-pink-600">
					Socials ヽ(♡‿♡)ノ
				</h2>
				<div className="grid grid-cols-2 gap-4">
					{config.socials &&
						config.socials.map((link, index) => (
							<a
								key={index}
								href={`/links/${link.name.toLowerCase()}`}
								className="flex items-center justify-center rounded-lg bg-pink-100 p-4 text-pink-600 transition-colors hover:bg-pink-200"
							>
								{link.icon && <link.icon className="mr-2 h-6 w-6" />}
								{link.name}
							</a>
						))}
				</div>
			</div>
		</Layout>
	)
}
