import fs from 'fs'
import path from 'path'

export type Metadata = {
  title: string
}
  
export type Markdown = {
  metadata: Metadata;
  slug: string;
  content: string;
};
  
  function parseFrontmatter(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    const match = frontmatterRegex.exec(fileContent)
    const frontMatterBlock = match![1]
    const content = fileContent.replace(frontmatterRegex, '').trim()
    const frontMatterLines = frontMatterBlock.trim().split('\n')
    const metadata: Partial<Metadata> = {}
  
    frontMatterLines.forEach((line) => {
      const [key, ...valueArr] = line.split(': ')
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
      metadata[key.trim() as keyof Metadata] = value
    })
  
    return { metadata: metadata as Metadata, content }
  }
  
  function getMDXFiles(dir: string): string[] {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx' || path.extname(file) === '.md')
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
  
export function getMarkdown(_: string): Markdown[] {
  const files = getMDXData(path.join(process.cwd(), 'markdown', _));
  
  
  return files;
}
  
export function getMarkdownContent(_: string, slug: string): Markdown | undefined {
    const files = getMDXData(path.join(process.cwd(), 'markdown', _));
    return files.find((file) => file.slug === slug);
}
  
  export function formatDate(date: string, includeRelative = false) {
    const currentDate = new Date()
    if (!date.includes('T')) {
      date = `${date}T00:00:00`
    }
    const targetDate = new Date(date)
  
    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
    const daysAgo = currentDate.getDate() - targetDate.getDate()
  
    let formattedDate = ''
  
    if (yearsAgo > 0) {
      formattedDate = `${yearsAgo}y ago`
    } else if (monthsAgo > 0) {
      formattedDate = `${monthsAgo}mo ago`
    } else if (daysAgo > 0) {
      formattedDate = `${daysAgo}d ago`
    } else {
      formattedDate = 'Today'
    }
  
    const fullDate = targetDate.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  
    if (!includeRelative) {
      return fullDate
    }
  
    return `${fullDate} (${formattedDate})`
  }
