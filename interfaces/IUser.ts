export interface IUser {
	login: string;
	avatar_url: string;
	name: string;
	company: string | null;
	email: string | null;
	bio: string | null;
	location: string | null;
	followers: number;
	following: number;
	created_at: string;
}
