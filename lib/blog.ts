import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Metadata = {
	title: string
	publishedAt: string
	summary: string
	image?: string
	imageCaption?: string
}

export type BlogPost = {
	metadata: Metadata
	slug: string
	content: string
}

function parseFrontmatter(fileContent: string): {
	metadata: Metadata
	content: string
} {
	const { data, content } = matter(fileContent)
	return {
		metadata: {
			title: data.title || '',
			publishedAt: data.publishedAt || '',
			summary: data.summary || '',
			image: data.image,
			imageCaption: data.imageCaption,
		},
		content: content.trim(),
	}
}

function getMDXFiles(dir: string): string[] {
	return fs
		.readdirSync(dir)
		.filter(
			(file) => path.extname(file) === '.mdx' || path.extname(file) === '.md',
		)
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, 'utf-8')
	return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
	const mdxFiles = getMDXFiles(dir)
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file))
		const slug = path.basename(file, path.extname(file))

		return {
			metadata,
			slug,
			content,
		}
	})
}

export function getBlogPosts(amount = 5, page = 1) {
	const posts = getMDXData(path.join(process.cwd(), 'content', 'blog'))

	const start = (page - 1) * amount
	const end = start + amount

	return posts.reverse().slice(start, end)
}

export function getAllBlogPosts() {
	return getMDXData(path.join(process.cwd(), 'content', 'blog'))
}

export function getBlogPost(slug: string): BlogPost | undefined {
	const posts = getMDXData(path.join(process.cwd(), 'content', 'blog'))
	return posts.find((post) => post.slug === slug)
}

export function generateBlogTimetoRead(content: string) {
	const wordsPerMinute = 200
	const words = content.split(/\s/g).length
	const minutes = words / wordsPerMinute
	const readTime = Math.ceil(minutes)
	return readTime
}

export function getBlogPages(limit: number) {
	const posts = getMDXData(path.join(process.cwd(), 'content', 'blog'))
	return Math.ceil(posts.length / limit)
}
