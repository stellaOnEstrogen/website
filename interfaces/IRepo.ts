export default interface IRepo {
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    language: string;
    license: {
        name: string;
    };
    topics: string[];
    contributors_count: number;
    owner_avatar_url: string;
}