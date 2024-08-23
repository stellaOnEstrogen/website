<script setup lang="ts">
import { computed } from '#imports';
import { languageColors } from '~/utils/languageColors';

const props = withDefaults(
	defineProps<{
		title?: string;
		description?: string;
		language?: string;
		open_issues?: string | number;
		stars?: string | number;
		contributors?: string | number;
		owner_avatar?: string;
	}>(),
	{
		title: 'UNKNOWN/REPO',
		description: 'UNKNOWN DESCRIPTION',
		language: 'python',
		open_issues: '0',
		stars: '0',
		contributors: '0',
		owner_avatar: 'https://via.placeholder.com/200',
	},
);

const org = computed(() => props.title.split('/')[0]);
const repo = computed(() => props.title.split('/')[1]);

const stars = computed(() => {
	return new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	}).format(Number(props.stars || 0));
});
const open_issues = computed(() =>
	new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	}).format(Number(props.open_issues || 0)),
);

const description = computed(() => (props.description || '').slice(0, 200));

let langColor = computed(() => {
	const lang = props.language || 'Unknown';
	return languageColors.filter((l) => l.slug === lang.toLowerCase())[0]?.color || '#333';
});
</script>

<template>
	<div class="w-full h-full flex flex-col bg-white">
		<div
			class="pt-[60px] pb-[70px] px-[6.75rem] h-full flex flex-col justify-between"
		>
			<div class="flex flex-row justify-between">
				<div class="max-w-[700px]">
					<h1
						class="mb-[30px] max-w-[700px] text-[60px] text-gray-900 font-normal flex flex-row"
					>
						<span>{{ org }}</span>
						<span v-if="repo" class="ml-2">/</span>
						<span v-if="repo" class="ml-2 font-bold">{{ repo }}</span>
					</h1>
					<p class="text-gray-500 max-w-[700px] text-[35px] leading-[60px]">
						{{ description }}
					</p>
				</div>
				<div class="text-[200px]">
					<!-- <img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
						class="w-[200px] h-[200px]"
					/> -->
					<img 
						:src="owner_avatar"
						class="w-[200px] h-[200px] rounded-[0.25rem]"
						style="object-fit: cover; border: 2px solid #ecdc5a; border-radius: 50px;"
					/>
				</div>
			</div>
			<div class="flex flex-row items-center justify-between">
				<div class="flex flex-row text-[40px]">
					<div class="flex flex-row pr-10">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 15 15"
						>
							<g fill="currentColor">
								<path
									d="M7.5 1a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 12a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11"
								/>
								<circle cx="7.5" cy="7.5" r="1" />
							</g>
						</svg>
						<div class="pl-2">
							<div>{{ open_issues }}</div>
							<div class="text-lg text-gray-600">Open Issues</div>
						</div>
					</div>
					<div class="flex flex-row pr-10">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 32 32"
						>
							<path
								fill="#888888"
								d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"
							/>
						</svg>
						<div class="pl-2">
							<div>{{ stars }}</div>
							<div class="text-lg text-gray-600">Stars</div>
						</div>
					</div>
					<div class="flex flex-row pr-10">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 32 32"
						>
							<path
								fill="#888888"
								d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64a5.7 5.7 0 0 1 0 8L16 26.13L5.64 15.64a5.7 5.7 0 0 1 0-8a5.48 5.48 0 0 1 7.82 0l2.54 2.6l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12a7.49 7.49 0 0 0-10.68 0a7.72 7.72 0 0 0 0 10.82L16 29l11.79-11.94a7.72 7.72 0 0 0 0-10.82A7.49 7.49 0 0 0 22.45 4Z"
							/>
						</svg>
						<div class="pl-2">
							<div>{{ contributors }}</div>
							<div class="text-lg text-gray-600">Contributors</div>
						</div>
					</div>
				</div>
				<div class="flex flex-row">
					<img
						:src="`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language.toLowerCase()}/${language.toLowerCase()}-original.svg`"
						class="rounded-[0.25rem] w-[100px] h-[100px]"
					/>
				</div>
			</div>
		</div>
		<!-- <div class="absolute bottom-0 w-full h-8 bg-[#ECDC5A]" /> -->
		 <div :class="`absolute bottom-0 w-full h-8 bg-[${langColor}]`" />
	</div>
</template>
