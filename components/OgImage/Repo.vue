<script setup lang="ts">
import { computed } from '#imports';

const props = withDefaults(
	defineProps<{
		title?: string;
		description?: string;
		language?: string;
		downloads?: string | number;
		stars?: string | number;
		contributors?: string | number;
		owner_avatar?: string;
	}>(),
	{
		title: 'UNKNOWN/REPO',
		description: 'UNKNOWN DESCRIPTION',
		language: 'python',
		downloads: '0',
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
const downloads = computed(() =>
	new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	}).format(Number(props.downloads || 0)),
);

const description = computed(() => (props.description || '').slice(0, 200));
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
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
						class="w-[200px] h-[200px]"
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
							viewBox="0 0 32 32"
						>
							<path
								fill="#888888"
								d="m4.67 28l6.39-12l7.3 6.49a2 2 0 0 0 1.7.47a2 2 0 0 0 1.42-1.07L27 10.9l-1.82-.9l-5.49 11l-7.3-6.49a2 2 0 0 0-1.68-.51a2 2 0 0 0-1.42 1L4 25V2H2v26a2 2 0 0 0 2 2h26v-2Z"
							/>
						</svg>
						<div class="pl-2">
							<div>{{ downloads }}</div>
							<div class="text-lg text-gray-600">Monthly Downloads</div>
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
						:src="owner_avatar"
						class="rounded-[0.25rem] w-[100px] h-[100px]"
						style="
							object-fit: cover;
							border: 2px solid #ecdc5a;
							border-radius: 50px;
						"
					/>
				</div>
			</div>
		</div>
		<div class="absolute bottom-0 w-full h-8 bg-[#ECDC5A]" />
	</div>
</template>
