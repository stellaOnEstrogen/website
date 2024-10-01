import type { IConfig } from './interfaces/IConfig'

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
			name: 'Twitter',
			url: 'https://x.com/stellerDev',
			openInNewTab: true,
		},
		{
			name: 'GitHub',
			url: 'https://github.com/stellaOnEstrogen',
			openInNewTab: true,
		},
		{
			name: 'Discord',
			url: 'https://discord.com/users/1248626823638552701',
			openInNewTab: true,
		},
	],
	avatar: '/me.jpg',
	about: `I'm a Full Stack Developer with a passion for vtubers and anime. I'm currently working on a project called VtubersTV, a platform for vtubers by vtubers. (I love CottontailVA)`,
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
	url: 'https://www.0x7ffed9b08230.dev',
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
		},
	],
}
