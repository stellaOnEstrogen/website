import {
	Github,
	Twitter,
	Twitch,
	Youtube,
	Codepen,
	Facebook,
	Gitlab,
	Trello,
	Slack,
	Instagram,
	Linkedin,
	Figma,
	MessageCircleQuestion,
} from 'lucide-react'

export function GithubIcon() {
	return <Github className="mr-2 h-4 w-4" />
}

export function TwitterIcon() {
	return <Twitter className="mr-2 h-4 w-4" />
}

export function TwitchIcon() {
	return <Twitch className="mr-2 h-4 w-4" />
}

export function YoutubeIcon() {
	return <Youtube className="mr-2 h-4 w-4" />
}

export function CodepenIcon() {
	return <Codepen className="mr-2 h-4 w-4" />
}

export function FacebookIcon() {
	return <Facebook className="mr-2 h-4 w-4" />
}

export function GitlabIcon() {
	return <Gitlab className="mr-2 h-4 w-4" />
}

export function TrelloIcon() {
	return <Trello className="mr-2 h-4 w-4" />
}

export function SlackIcon() {
	return <Slack className="mr-2 h-4 w-4" />
}

export function InstagramIcon() {
	return <Instagram className="mr-2 h-4 w-4" />
}

export function LinkedinIcon() {
	return <Linkedin className="mr-2 h-4 w-4" />
}

export function FigmaIcon() {
	return <Figma className="mr-2 h-4 w-4" />
}

export function GetIcon(name: string) {
	switch (name) {
		case 'github':
			return <GithubIcon />
		case 'twitter':
			return <TwitterIcon />
		case 'twitch':
			return <TwitchIcon />
		case 'youtube':
			return <YoutubeIcon />
		case 'codepen':
			return <CodepenIcon />
		case 'facebook':
			return <FacebookIcon />
		case 'gitlab':
			return <GitlabIcon />
		case 'trello':
			return <TrelloIcon />
		case 'slack':
			return <SlackIcon />
		case 'instagram':
			return <InstagramIcon />
		case 'linkedin':
			return <LinkedinIcon />
		case 'figma':
			return <FigmaIcon />
		default:
			return <MessageCircleQuestion className="mr-2 h-4 w-4" />
	}
}
