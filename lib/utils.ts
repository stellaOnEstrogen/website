import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface IPronounsOptions {
	isNormalized?: boolean
	returnAsString?: boolean
}

interface Pronouns {
	subject: string
	object: string
	possessive: string
	reflexive: string
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function makePronouns(
	pronouns: string,
	options: IPronounsOptions = {},
): Pronouns | string {
	const [subject, object, possessive = '', reflexive = ''] = pronouns.split('/')

	const subjectNormalized = options.isNormalized ? capitalize(subject) : subject
	const objectNormalized = options.isNormalized ? capitalize(object) : object
	const possessiveNormalized =
		options.isNormalized ? capitalize(possessive) : possessive
	const reflexiveNormalized =
		options.isNormalized ? capitalize(reflexive) : reflexive

	if (options.returnAsString) {
		return `${subjectNormalized}/${objectNormalized}/${possessiveNormalized}/${reflexiveNormalized}`
	}
	return {
		subject: subjectNormalized,
		object: objectNormalized,
		possessive: possessiveNormalized,
		reflexive: reflexiveNormalized,
	}
}

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/`/g, '&#x60;')
		.replace(/\//g, '&#x2F;')
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
