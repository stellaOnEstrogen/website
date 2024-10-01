'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { User, MessageCircle, Music, Skull } from 'lucide-react'
import { config } from '@/config'
import { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Link from 'next/link'
import { GetIcon } from '@/components/icons'
import { useNightMode } from '@/hooks/useNightMode'

const getBlogPosts = async (
	page: number,
	limit: number,
): Promise<BlogPost[]> => {
	const res = await fetch(`/api/blog?page=${page}&limit=${limit}`)
	if (!res.ok) {
		throw new Error('Failed to fetch blog posts')
	}
	return res.json().then((data: { data: BlogPost[] }) => data.data)
}

export default function Home() {
	const { isNightMode, toggleNightMode } = useNightMode()
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		getBlogPosts(1, 4)
			.then(setBlogPosts)
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<main className="container mx-auto flex-grow px-4 py-8">
				<section id="about" className="mb-12">
					<h2 className="mb-4 flex items-center text-3xl font-bold">
						<User className="mr-2" />
						About Me
					</h2>
					<Card
						className={`${isNightMode ? 'border-red-900 bg-gray-900' : 'border-gray-300 bg-white'}`}
					>
						<CardContent className="p-6">
							<p
								className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}
							>
								{config.about}
							</p>
							<div className="mt-4 flex items-center space-x-2 text-sm">
								<Skull
									className={`h-4 w-4 ${isNightMode ? 'text-red-500' : 'text-gray-500'}`}
								/>
								<span
									className={`text-sm ${isNightMode ? 'text-red-500' : 'text-gray-500'}`}
								>
									{config.pronouns}
								</span>
							</div>
						</CardContent>
					</Card>
				</section>

				<section id="blog" className="mb-12">
					<h2 className="mb-4 flex items-center text-3xl font-bold">
						<MessageCircle className="mr-2" />
						From my mind to yours
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						{isLoading ?
							Array(4)
								.fill(0)
								.map((_, i) => (
									<Card
										key={i}
										className={`${isNightMode ? 'border-red-900 bg-gray-900' : 'border-gray-300 bg-white'}`}
									>
										<CardContent className="p-6">
											<Skeleton className="mb-2 h-6 w-3/4" />
											<Skeleton className="h-4 w-1/2" />
										</CardContent>
									</Card>
								))
						:	blogPosts.map((post, i) => (
								<Card
									key={`${post.metadata.title}-${i}`}
									className={`${isNightMode ? 'border-red-900 bg-gray-900' : 'border-gray-300 bg-white'}`}
								>
									<CardContent className="p-6">
										<Link href={`/grimoire/${post.slug}`}>
											<h3
												className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'} mb-2 text-xl font-semibold`}
											>
												{post.metadata.title}
											</h3>
										</Link>
										<p
											className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'}`}
										>
											{formatDate(post.metadata.publishedAt)}
										</p>
										<p
											className={`${isNightMode ? 'text-gray-300' : 'text-gray-700'} mt-4 border-t border-gray-300 pt-4 text-sm`}
										>
											{post.metadata.summary}
										</p>
									</CardContent>
								</Card>
							))
						}
					</div>
				</section>

				<section id="ritual-music" className="mb-12">
					<h2 className="mb-4 flex items-center text-3xl font-bold">
						<Music className="mr-2" />
						My Ritual Music
					</h2>
					<Link
						href="https://open.spotify.com/user/31ztkrtzz4grziugqpjtxna74ija?si=3f632fb14b2d4426"
						target="_blank"
					>
						<img
							src="https://spotify-recently-played-readme.vercel.app/api?user=31ztkrtzz4grziugqpjtxna74ija&count=5&unique=true"
							alt="Spotify recently played"
							width={400}
							height={330}
						/>
					</Link>
				</section>

				<section id="socials">
					<h2 className="mb-4 text-3xl font-bold">
						Let the demons talk to you
					</h2>
					<div className="flex space-x-4">
						{config.socials?.map((social) => (
							<Link href={social.url} target="_blank" key={social.name}>
								<Button
									key={social.name}
									variant="outline"
									className={`${isNightMode ? 'border-red-900 hover:bg-red-900' : 'border-gray-300 hover:bg-gray-300'} transition-colors hover:text-black`}
								>
									{GetIcon(social.name.toLowerCase())}
									{social.name}
								</Button>
							</Link>
						))}
					</div>
				</section>
			</main>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
