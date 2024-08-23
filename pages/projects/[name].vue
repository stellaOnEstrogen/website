<script setup lang="ts">
import { config } from '~/config';
import { makePronouns } from '~/utils/sentence';
import { getRepos } from '~/utils/github';
const router = useRouter();
const route = useRoute();
const $name = route.params.name;

const name = ref($name);

if (!config.githubUserName) {
    throw new Error('GitHub username is not set in the config. Unable to fetch data from GitHub.');
}



const repos = await getRepos();

if (!repos) {
    throw new Error('Failed to fetch repositories from GitHub.');
}

const item = computed(() => {
    return repos.find((repo) => repo.name === name.value);
});

if (!item.value) {
    router.push('/projects');
}

const project = ref(item.value);

if (!project.value) {
    throw new Error('Failed to fetch project data from GitHub.');
}

/**
 * { name: 'git-account-switcher',
  full_name: 'stellaOnEstrogen/git-account-switcher',
  description:
   'The Git Account Switcher is a tool designed to simplify the management of multiple Git configurations, allowing you to seamlessly switch between different accounts while working on various projects.',
  html_url: 'https://github.com/stellaOnEstrogen/git-account-switcher',
  stargazers_count: 3,
  watchers_count: 3,
  forks_count: 0,
  open_issues_count: 0,
  created_at: '2024-06-06T23:04:54Z',
  updated_at: '2024-08-19T13:44:15Z',
  pushed_at: '2024-08-19T13:44:11Z',
  language: 'Python',
  license: { name: 'Creative Commons Zero v1.0 Universal' },
  topics: [ 'accounts', 'git', 'gitconfig', 'github', 'python', 'python3' ],
  contributors_count: 1,
  owner_avatar_url: 'https://avatars.githubusercontent.com/u/171978943?v=4' }
 */
console.log(project.value);


defineOgImageComponent('Repo', {
	title: project.value.name,
    description: project.value.description.length > 150 ? project.value.description.slice(0, 150).concat('...') : project.value.description,
    language: project.value.language || 'Unknown',
    open_issues: project.value.open_issues_count || 0,
    stars: project.value.stargazers_count || 0,
    contributors: project.value.contributors_count || 0,
    owner_avatar: project.value.owner_avatar_url || 'https://via.placeholder.com/200',
});

function makeRepoName(name: string) {
    // Take for example: image-uploader-1 -> Image Uploader 1
    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

}

const repoName = makeRepoName(project.value.name);
</script>

<template>
	<h2 class="text-2xl font-semibold text-pink-600 text-center" id="projects">
        Projects • {{ repoName }}
	</h2>

    <!-- Forks, Stars, Contributors, Language, Open Issues -->
    <div class="flex flex-row justify-center mt-4">
        <div class="flex flex-col items-center mr-4">
            <span class="text-gray-700">Stars</span>
            <span class="text-2xl font-semibold text-pink-600">{{ project?.stargazers_count }}</span>
        </div>
        <div class="flex flex-col items-center mr-4">
            <span class="text-gray-700">Open Issues</span>
            <span class="text-2xl font-semibold text-pink-600">{{ project?.open_issues_count }}</span>
        </div>
        <div class="flex flex-col items-center mr-4">
            <span class="text-gray-700">Contributors</span>
            <span class="text-2xl font-semibold text-pink-600">{{ project?.contributors_count }}</span>
        </div>
    </div>

    <p class="text-gray-700 mt-4 text-center">
        {{ project?.description }}
    </p>

    <div class="mt-4 text-center">
        <a
            :href="project?.html_url"
            target="_blank"
            class="text-blue-600"
            >View on GitHub</a
        >
    </div>



    
</template>

<style scoped>

</style>
