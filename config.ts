import type { IConfig } from './interfaces/IConfig'
import { SiGithub, SiDiscord, SiBluesky, SiGoogle } from "@icons-pack/react-simple-icons"

export const config: IConfig = {
	githubUserName: 'stellaOnEstrogen',
	company: {
		name: 'VtubersTV',
		url: 'https://vtubers.tv',
	},
	location: 'Tokyo, Japan',
	email: 'stella.dev@proton.me',
	pronouns: 'she/her/hers/herself',
	name: 'Stella',
	socials: [
		{
			name: 'BlueSky',
			url: 'https://bsky.app/profile/stella.vtubers.tv',
			icon: SiBluesky,
		},
		{
			name: 'GitHub',
			url: 'https://github.com/stellaOnEstrogen',
			icon: SiGithub,
		},
		{
			name: 'Discord',
			url: 'https://discord.com/users/1248626823638552701',
			icon: SiDiscord,
		},
	],
	avatar: '/me.jpg',
	about: `
		I'm a Fullstack Developer and a Software Engineer. I love to code, break things, and build things. I am the Owner and Lead Developer of VTubersTV.	
	`,
	components: {
		images: {
			enabled: false,
			url: 'https://i.0x7ffed9b08230.dev',
		},
	},
	contact: {
		email: 'stella.dev@proton.me',
		discordServer: 'https://discord.gg/tf73bchpqT',
	},
	// To get the timezone, you can use the following command: node -p 'Intl.DateTimeFormat().resolvedOptions().timeZone' \\
	timezone: 'Asia/Tokyo',
	url: 'https://api.vtubers.tv',
	frontLinks: [
		{
			name: 'Blog',
			href: '/blog',
		},
		{
			name: 'About',
			href: '/about',
		},
		{
			name: 'Discord',
			href: 'https://discord.gg/tf73bchpqT',
		},
	],
	links: [
		{
			name: 'Google',
			url: 'https://google.com',
			icon: SiGoogle,
		},
		{
			name: 'VTubersTV',
			url: 'https://vtubers.tv',
		},
	],
}
