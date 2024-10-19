import Link from 'next/link'
import {
	Home,
	User,
	Heart,
	Share2,
	Github,
	Mail
} from 'lucide-react'
import { config } from '@/config'
import Image from 'next/image'
import Clock from './Clock'
import { Tooltip } from './ui/tooltip'
import { Background } from './Background'



export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center bg-pink-100 p-4">
			<div className="z-20 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-lg">
				<header className="bg-pink-300 p-6 text-center">
					<Image
						src={config.avatar}
						alt={config.name}
						width={96}
						height={96}
						className="mx-auto mb-4 rounded-full border-4 border-white"
					/>
					<h1 className="text-2xl font-bold text-white">{config.name}</h1>
					<Clock useLocation />
				</header>
				<nav
					className="flex justify-center bg-pink-200 p-2"
					style={{ gap: '1rem' }}
				>
					<Tooltip content="Home">
						<Link href="/" className="mx-2 text-pink-600 hover:text-pink-800">
							<Home className="h-6 w-6" />
						</Link>
					</Tooltip>
					<Tooltip content="About">
						<Link
							href="/about"
							className="mx-2 text-pink-600 hover:text-pink-800"
						>
							<User className="h-6 w-6" />
						</Link>
					</Tooltip>
					<Tooltip content="Message Rules">
						<Link
							href="/dm"
							className="mx-2 text-pink-600 hover:text-pink-800"
						>
							<Mail className="h-6 w-6" />
						</Link>
					</Tooltip>
					<Tooltip content="Socials">
						<Link
							href="/socials"
							className="mx-2 text-pink-600 hover:text-pink-800"
						>
							<Share2 className="h-6 w-6" />
						</Link>
					</Tooltip>
				</nav>
				<main className="p-6">{children}</main>
				<footer className="bg-pink-200 p-4 text-center text-pink-600">
					<p>
						© {new Date().getFullYear()} {config.name} • Made with{' '}
						<Heart className="inline h-4 w-4" /> and open source on{' '}
						<Link href={`https://github.com/${config.githubUserName}/website`}>
							<Github className="inline h-4 w-4" />
						</Link>
					</p>
				</footer>
			</div>
			<div className="pointer-events-none fixed left-0 top-0 z-10 h-full w-full">
				<Background />
			</div>
		</div>
	)
}
