'use client'

import Layout from '../Layout'
import { config } from '@/config'

export function HomeComponent() {
	return (
		<Layout>
			<div className="text-center">
				<h2 className="mb-4 text-2xl font-bold text-pink-600">
					Welcome! (＾▽＾)
				</h2>
				<p className="text-gray-600">{config.about}</p>
			</div>
		</Layout>
	)
}
