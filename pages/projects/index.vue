<script setup lang="ts">
import { config } from '~/config';
import { makePronouns } from '~/utils/sentence';
import { getRepos } from '~/utils/github';
const router = useRouter();
const route = useRoute();

if (!config.githubUserName) {
    throw new Error('GitHub username is not set in the config. Unable to fetch data from GitHub.');
}



const repos = await getRepos();


defineOgImageComponent('Main', {
	title: config.name,
	description: config.about.slice(0, 150).trim().concat('...'),
	headline: `Welcome to ${config.name}'s website!`,
});
</script>

<template>
	<h2 class="text-2xl font-semibold text-pink-600 text-center" id="projects">
        Projects (/▽＼)
	</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div
            v-for="repo in repos"
            :key="repo.name"
            class="bg-white shadow-md rounded-lg p-4"
        >
            <h3 class="text-l font-semibold text-pink-600">{{ repo.name }}</h3>
            <p class="text-gray-700 mt-2">{{ repo.description.length > 100 ? repo.description.slice(0, 100).concat('...') : repo.description }}</p>
            <div class="mt-4">
                <a
                    :href="`/projects/${repo.name}`"
                    target="_blank"
                    class="text-blue-600"
                    >View</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
