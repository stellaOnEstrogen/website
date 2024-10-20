import type { Timezones, Pronouns } from '@/types/Config'
import { IconType } from '@icons-pack/react-simple-icons'

export interface IConfig {
	githubUserName: string
	name: string
	pronouns: Pronouns
	about: string
	email: string
	socials?: ISocials[]
	location: string
	avatar: string
	company: {
		name: string
		url: string
	}
	components: {
		images: {
			enabled: boolean
			url: string
		}
	}
	contact: {
		email?: string
		discordServer?: string
	}
	timezone: Timezones
	url: string
	frontLinks: {
		name: string
		href: string
	}[]
	links: ILink[]
}

interface ISocials {
	name: string
	url: string
	icon?: IconType
}

interface ILink {
	name: string
	url: string
	icon?: IconType
}
