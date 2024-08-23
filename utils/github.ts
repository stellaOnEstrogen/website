import axios from 'axios';
import { config } from '~/config';
import type { IUser } from '~/interfaces/IUser';
import NodeCache from 'node-cache';
import type IRepo from '~/interfaces/IRepo';

// 30 minutes cache
const CACHE_TTL = 1800;
const repoCache = new NodeCache({ stdTTL: CACHE_TTL });
const userCache = new NodeCache({ stdTTL: CACHE_TTL });

const fetch = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
  },
});

// Utility function to handle API requests
async function fetchData<T>(url: string, cache: NodeCache, cacheKey: string): Promise<T | null> {
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch.get<T>(url);
    if (response.status === 200) {
      cache.set(cacheKey, response.data);
      return response.data;
    } else {
      console.error(`Failed to fetch ${url}: ${response.statusText}`);
      return null;
    }
  } catch (error: any) {
    if (error.response) {
      console.error(`Error fetching ${url}:`, error.response.status, error.response.data);
    } else if (error.request) {
      console.error(`No response received from ${url}:`, error.request);
    } else {
      console.error('Error', error.message);
    }
    return null;
  }
}

export async function getRepoData(repo: string): Promise<any> {
  return fetchData(`/repos/${config.githubUserName}/${repo}`, repoCache, repo);
}

export async function getUser(): Promise<IUser | null> {
  const userData = await fetchData<IUser>(`/users/${config.githubUserName}`, userCache, config.githubUserName);
  if (!userData) return null;

  return {
    login: userData.login,
    avatar_url: userData.avatar_url,
    name: userData.name,
    company: userData.company,
    email: userData.email,
    bio: userData.bio,
    location: userData.location,
    followers: userData.followers,
    following: userData.following,
    created_at: userData.created_at,
  };
}

export async function getRepos(): Promise<IRepo[] | null> {
  const reposData = await fetchData<any[]>(`/users/${config.githubUserName}/repos`, repoCache, 'repos');
  if (!reposData) return null;

  const reposWithContributors = await Promise.all(
    reposData.map(async (repo) => {
      const contributorsData = await fetchData<any[]>(
        `/repos/${config.githubUserName}/${repo.name}/contributors?per_page=1&anon=false`,
        repoCache,
        `${repo.name}_contributors`
      );

      const contributorsCount = contributorsData ? contributorsData.length : 0;

      return {
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        language: repo.language,
        license: { name: repo.license?.name || '' },
        topics: repo.topics,
        contributors_count: contributorsCount,
        owner_avatar_url: repo.owner.avatar_url,
      };
    })
  );

  return reposWithContributors;
}
