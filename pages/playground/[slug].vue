<script setup lang="ts">
const route = useRoute();
const router = useRouter();
import { PlaygroundItems } from '~/utils/playground';
const $slug = route.params.slug;

const slug = ref($slug);
const loadedCode = ref<boolean>(false);

const item = computed(() => {
	return PlaygroundItems.find((item) => item.slug === slug.value);
});

if (!item.value) {
	router.push('/playground');
}

const playgroundItem = ref(item.value);

defineOgImageComponent('Main', {
	title: playgroundItem.value?.title,
	description: playgroundItem.value?.description,
	headline: `Playground • ${playgroundItem.value?.title}`,
});

onMounted(() => {
	const link = document.getElementById('front-link-playground');

	if (link) {
		link.setAttribute('href', '/');
		link.textContent = 'Home';
	}

	playgroundItem.value?.module.then((module) => {
		module.default();
		loadedCode.value = true;
	});
});
</script>

<template>
	<div>
		<h1
			class="text-2xl font-semibold text-pink-600 text-center"
			id="playground"
		>
			Playground • {{ playgroundItem?.title }}
		</h1>

		<div class="mt-4 text-center text-gray-700 text-sm">
			<a href="/playground" class="text-blue-600 hover:underline">Back</a>
			<a
				:href="playgroundItem?.github"
				class="text-blue-600 hover:underline ml-4"
				target="_blank"
				>Source</a
			>
		</div>

		<USkeleton class="w-full h-96" v-if="!loadedCode" />
		<div id="playground-code" class="mt-4"></div>
	</div>
</template>
