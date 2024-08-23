<script setup lang="ts">
import { PlaygroundItems } from '~/utils/playground';
import { config } from '~/config';

defineOgImageComponent('Main', {
	title: config.name,
	description: `Check out the playground items available on ${config.name}'s website!`,
	headline: `Playground`,
});

</script>

<template>
	<div>
		<h1
			class="text-2xl font-semibold text-pink-600 text-center"
			id="playground"
		>
			Playground
		</h1>
		<div class="mt-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div
					v-for="(item, index) in PlaygroundItems"
					:key="index"
					class="bg-white p-4 rounded-lg shadow-md"
				>
					<h2 class="text-xl font-semibold text-pink-600">{{ item.title }}</h2>
					<p class="text-gray-700 mt-4">{{ item.description }}</p>
					<div class="mt-4">
						<a
							:href="`/playground/${item.slug}`"
							class="text-blue-600 hover:underline"
							>View</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
