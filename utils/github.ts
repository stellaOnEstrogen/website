import axios from 'axios';
import { config } from '~/config';
import type { IUser } from '~/interfaces/IUser';

const fetch = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Accept: 'application/vnd.github.v3+json',
		Authorization: `token ${process.env.GITHUB_TOKEN}`,
	},
});

function tokenValid(): boolean {
	if (!process.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN.length !== 40) {
		return false;
	} else {
		return true;
	}
}

export async function getRepoData(repo: string): Promise<any> {
	if (!tokenValid()) {
		return null;
	}

	try {
		const response = await fetch.get(`/repos/${config.githubUserName}/${repo}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getUser(): Promise<IUser | null> {
	if (!tokenValid()) {
		return null;
	}

	try {
		const response = await fetch.get(`/users/${config.githubUserName}`);

		if (response.status !== 200) {
			return null;
		} else {
			return {
				login: response.data.login,
				avatar_url: response.data.avatar_url,
				name: response.data.name,
				company: response.data.company,
				email: response.data.email,
				bio: response.data.bio,
				location: response.data.location,
				followers: response.data.followers,
				following: response.data.following,
				created_at: response.data.created_at,
			};
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}
