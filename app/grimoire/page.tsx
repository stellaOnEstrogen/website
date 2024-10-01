'use client'

import { useEffect, useState, Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageCircle } from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Link from 'next/link'
import { useNightMode } from '@/hooks/useNightMode'
import { useSearchParams } from 'next/navigation'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

const PAGE_LIMIT = 10
const PAGINATION_ELLIPSIS = 3

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

const getBlogPages = async (limit: number): Promise<number> => {
	const res = await fetch(`/api/blog?getPages=true&pLimit=${limit}`)
	if (!res.ok) {
		throw new Error('Failed to fetch blog pages')
	}
	return res.json().then((data: { data: number }) => data.data)
}

function GrimoireContent({ isNightMode }: { isNightMode: boolean }) {
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isLoading, setIsLoading] = useState(true)
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.get('page') || '1', 10)

	useEffect(() => {
		setIsLoading(true)
		Promise.all([getBlogPosts(page, PAGE_LIMIT), getBlogPages(PAGE_LIMIT)])
			.then(([posts, pages]) => {
				setBlogPosts(posts)
				setTotalPages(pages)
			})
			.catch((error) => console.error('Error fetching data:', error))
			.finally(() => setIsLoading(false))
	}, [page])

	const renderPaginationItems = () => {
		const items = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink href={`?page=${i}`} isActive={i === page}>
							{i}
						</PaginationLink>
					</PaginationItem>,
				)
			}
		} else {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink href="?page=1" isActive={1 === page}>
						1
					</PaginationLink>
				</PaginationItem>,
			)

			if (page > PAGINATION_ELLIPSIS) {
				items.push(<PaginationEllipsis key="ellipsis-start" />)
			}

			const start = Math.max(2, page - 1)
			const end = Math.min(totalPages - 1, page + 1)

			for (let i = start; i <= end; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink href={`?page=${i}`} isActive={i === page}>
							{i}
						</PaginationLink>
					</PaginationItem>,
				)
			}

			if (page < totalPages - 2) {
				items.push(<PaginationEllipsis key="ellipsis-end" />)
			}

			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						href={`?page=${totalPages}`}
						isActive={totalPages === page}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			)
		}

		return items
	}

	return (
		<main className="container mx-auto flex-grow px-4 py-8">
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
			<Pagination>
				<PaginationContent>
					{page > 1 && (
						<PaginationItem>
							<PaginationPrevious href={`?page=${page - 1}`} />
						</PaginationItem>
					)}
					{renderPaginationItems()}
					{page < totalPages && (
						<PaginationItem>
							<PaginationNext href={`?page=${page + 1}`} />
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</main>
	)
}

export default function Grimoire() {
	const { isNightMode, toggleNightMode } = useNightMode()

	return (
		<div
			className={`min-h-screen ${isNightMode ? 'bg-black text-red-500' : 'bg-gray-200 text-gray-900'} flex flex-col transition-colors duration-500`}
		>
			<Header isNightMode={isNightMode} toggleNightMode={toggleNightMode} />
			<Suspense fallback={<div>Loading...</div>}>
				<GrimoireContent isNightMode={isNightMode} />
			</Suspense>
			<Footer isNightMode={isNightMode} />
		</div>
	)
}
