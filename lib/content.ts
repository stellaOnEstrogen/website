import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import matter from 'gray-matter'

/**
 * Represents the metadata of a content file.
 */
export type Metadata = {
	title?: string
	date?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

/**
 * Represents a content file with its metadata, slug, and content.
 */
export type Content = {
	metadata: Metadata
	slug: string
	content: string
}

/**
 * Parses the frontmatter of a content file.
 * @param fileContent - The content of the file.
 * @param fileType - The type of the file (json, yaml, text, markdown, html).
 * @returns An object containing the parsed metadata and content.
 */
function parseFrontmatter(
	fileContent: string,
	fileType: string,
): { metadata: Metadata; content: string } {
	switch (fileType) {
		case 'json':
			try {
				const parsed = JSON.parse(fileContent)
				return {
					metadata: parsed.metadata || {},
					content: parsed || '',
				}
			} catch (error) {
				console.error('Error parsing JSON:', error)
				return { metadata: {}, content: fileContent }
			}
		case 'yaml':
		case 'yml':
			try {
				const parsed = yaml.load(fileContent) as {
					metadata?: Metadata
					content?: string
				}
				return {
					metadata: parsed.metadata || {},
					content: parsed.content || '',
				}
			} catch (error) {
				console.error('Error parsing YAML:', error)
				return { metadata: {}, content: fileContent }
			}
		case 'markdown':
		case 'md':
		case 'mdx':
			const { data, content } = matter(fileContent)
			return {
				metadata: data,
				content: content.trim(),
			}
		case 'html':
			const htmlMetadataRegex = /<!--\s*METADATA\s*([\s\S]*?)\s*-->/
			const htmlMatch = htmlMetadataRegex.exec(fileContent)
			if (htmlMatch) {
				try {
					const metadata = yaml.load(htmlMatch[1]) as Metadata
					const content = fileContent.replace(htmlMetadataRegex, '').trim()
					return { metadata, content }
				} catch (error) {
					console.error('Error parsing HTML metadata:', error)
				}
			}
			return { metadata: {}, content: fileContent.trim() }
		case 'text':
		case 'txt':
		default:
			return { metadata: {}, content: fileContent.trim() }
	}
}

/**
 * Gets all content files in a directory.
 * @param dir - The directory to search for content files.
 * @returns An array of content file names.
 */
function getContentFilesInDir(dir: string): string[] {
	return fs
		.readdirSync(dir)
		.filter((file) =>
			['.json', '.yaml', '.yml', '.md', '.mdx', '.html', '.txt'].includes(
				path.extname(file).toLowerCase(),
			),
		)
}

/**
 * Reads and parses a content file.
 * @param filePath - The path to the content file.
 * @returns An object containing the parsed metadata and content.
 */
export function readContentFile(filePath: string): {
	metadata: Metadata
	content: string
} {
	const fileExists = fs.existsSync(filePath)
	if (!fileExists) {
		return { metadata: {}, content: '' }
	}
	const rawContent = fs.readFileSync(filePath, 'utf-8')
	const fileType = path.extname(filePath).slice(1).toLowerCase()
	return parseFrontmatter(rawContent, fileType)
}

/**
 * Gets data from all content files in a directory.
 * @param dir - The directory containing content files.
 * @returns An array of Content objects.
 */
function getContentData(dir: string): Content[] {
	const contentFiles = getContentFilesInDir(dir)
	return contentFiles.map((file) => {
		const { metadata, content } = readContentFile(path.join(dir, file))
		const slug = path.basename(file, path.extname(file))

		return {
			metadata,
			slug,
			content,
		}
	})
}

/**
 * Gets all content files from a specific directory.
 * @param dirName - The name of the directory within the 'content' folder.
 * @returns An array of Content objects.
 */
export function getContent(dirName: string): Content[] {
	const files = getContentData(path.join(process.cwd(), 'content', dirName))
	return files
}

/**
 * Gets all content file paths in the 'content' directory and its subdirectories.
 * @param dir - The directory to start searching from within the 'content' folder.
 * @returns An array of content file paths relative to the 'content' directory.
 */
export function getContentFiles(dir: string = ''): string[] {
	const contentDir = path.join(process.cwd(), 'content', dir)

	const walk = (currentDir: string): string[] => {
		let files: string[] = []
		const items = fs.readdirSync(currentDir)

		for (const item of items) {
			const fullPath = path.join(currentDir, item)
			const stat = fs.statSync(fullPath)

			if (stat.isDirectory()) {
				files = files.concat(walk(fullPath))
			} else if (
				stat.isFile() &&
				['.json', '.yaml', '.yml', '.md', '.mdx', '.html', '.txt'].includes(
					path.extname(item).toLowerCase(),
				)
			) {
				const relativePath = path.relative(contentDir, fullPath)
				files.push(relativePath.replace(/\\/g, '/'))
			}
		}

		return files
	}

	return walk(contentDir)
}

/**
 * Gets the content of a specific file.
 * @param dirName - The name of the directory within the 'content' folder.
 * @param slug - The slug of the content file.
 * @returns The Content object if found, undefined otherwise.
 */
export function getContentItem(
	dirName: string,
	slug: string,
): Content | undefined {
	const files = getContentData(path.join(process.cwd(), 'content', dirName))
	return files.find((file) => file.slug === slug)
}

/**
 * Formats a date string.
 * @param date - The date string to format.
 * @param includeRelative - Whether to include relative time in the output.
 * @returns A formatted date string.
 */
export function formatDate(date: string, includeRelative = false): string {
	const currentDate = new Date()
	const targetDate = new Date(date.includes('T') ? date : `${date}T00:00:00`)

	const diffTime = currentDate.getTime() - targetDate.getTime()
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	let formattedDate = ''

	if (diffDays > 365) {
		formattedDate = `${Math.floor(diffDays / 365)}y ago`
	} else if (diffDays > 30) {
		formattedDate = `${Math.floor(diffDays / 30)}mo ago`
	} else if (diffDays > 0) {
		formattedDate = `${diffDays}d ago`
	} else {
		formattedDate = 'Today'
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})

	return includeRelative ? `${fullDate} (${formattedDate})` : fullDate
}

/**
 * Converts a file extension to a MIME type.
 * @param ext - The file extension.
 * @returns The MIME type as a string.
 */
export function extToType(ext: string): string {
	const mimeTypes: { [key: string]: string } = {
		json: 'application/json',
		yaml: 'application/x-yaml',
		yml: 'application/x-yaml',
		md: 'text/markdown',
		mdx: 'text/markdown',
		html: 'text/html',
		txt: 'text/plain',
	}

	return mimeTypes[ext.toLowerCase()] || 'text/plain'
}
