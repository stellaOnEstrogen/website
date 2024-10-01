import { config } from '@/config'

export default function Footer({ isNightMode }: { isNightMode: boolean }) {
	return (
		<footer
			className={`border-t ${isNightMode ? 'border-red-900 text-gray-500' : 'border-gray-300 text-gray-600'} p-4 text-center`}
		>
			<p>
				&copy; {new Date().getFullYear()} {config.name} | All Rights Reserved
				(and some you didn&apos;t know about)
			</p>
		</footer>
	)
}
