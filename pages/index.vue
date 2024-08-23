<script setup lang="ts">
import { config } from '~/config';
import { makePronouns } from '~/utils/sentence';

const picturesData = ref<any[]>([]);
const picturesStatus = ref('pending');

if (!config.components.images.enabled) {
	console.warn('Images are disabled in the config. Skipping fetching images.');
} else {
	// https://github.com/stellaOnEstrogen/image-uploader/blob/main/docs/Api/get-media.md
	const { data, pending } = await useFetch(
		`${config.components.images.url}/api/get-media?by=1&sort=DESC&order=UploadedAt&limit=6`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	//@ts-ignore
	picturesData.value = data.value.filter((image) => !image.ContentType.startsWith('video'));
	picturesStatus.value = pending ? 'pending' : 'done';

}

defineOgImageComponent('Main', {
	title: config.name,
	description: config.about.slice(0, 150).trim().concat('...'),
	headline: `Welcome to ${config.name}'s website!`,
});

const pics: any = picturesData.value || [];

const picturesPending = picturesStatus.value === 'pending';

const pronouns = makePronouns(config.pronouns, {
	isNormalized: true,
});
</script>

<template>
	<h2 class="text-2xl font-semibold text-pink-600 text-center" id="about">
		About Me (^///^)
	</h2>
	<p class="text-gray-700 mt-4">
		{{ config.about }}
	</p>

	

	<h2
		class="text-2xl font-semibold text-pink-600 text-center mt-4"
		id="contact"
	>
		Contact Me (≧∇≦)/
	</h2>
	<p class="text-gray-700 mt-4" v-if="config.contact" id="contact-info">
		<span v-if="config.email"
			>Email:
			<a :href="`mailto:${config.email}`" class="text-blue-600">{{
				config.email
			}}</a></span
		>
		<span v-if="config.contact.discordServer"
			>Discord Server:
			<a
				:href="config.contact.discordServer"
				target="_blank"
				class="text-blue-600"
				>{{ config.contact.discordServer }}</a
			></span
		>
	</p>

	<h2
		class="text-2xl font-semibold text-pink-600 text-center mt-4"
		id="socials"
	>
		Socials (≧▽≦)
	</h2>
	<ul class="text-gray-700 mt-4 text-center">
		<li v-for="(social, index) in config.socials" :key="index">
			<a
				:href="social.url"
				:target="`social.openInNewTab ? '_blank' : '_self'`"
				class="text-blue-600"
				>{{ social.name }}</a
			>
		</li>
	</ul>

	<h2
		class="text-2xl font-semibold text-pink-600 text-center mt-4"
		id="pronouns"
	>
		Pronouns (´｡• ω •｡`)
	</h2>
	<p class="text-gray-700 mt-4 text-center">
		<span
			v-for="(pronoun, index) in pronouns"
			:key="index"
			class="separator"
			data-separator=" / "
			>{{ pronoun }}</span
		>
	</p>

	<h2
		class="text-2xl font-semibold text-pink-600 text-center mt-4"
		id="open-source"
	>
		Open Source >ω<
	</h2>
	<p class="text-gray-700 mt-4 text-center">
		This website is open source! You can find the code on
		<a
			href="https://github.com/stellaonestrogen/website"
			target="_blank"
			class="text-blue-600"
			>GitHub</a
		>. <small>Contributions are welcome! ^_^</small>
	</p>

	<h2
		class="text-2xl font-semibold text-pink-600 text-center mt-4"
		id="credits"
	>
		Credits (^人^)
	</h2>
	<p class="text-gray-700 mt-4 text-center mb-4 text-sm">
		This website was made with
		<a href="https://nuxt.com" target="_blank" class="text-blue-600">Nuxt</a>
		and was developed and designed by
		<a href="https://x.com/stellerDev" target="_blank" class="text-blue-600"
			>Stella</a
		>.
	</p>

	<h2
		class="text-2xl font-semibold text-pink-600 text-center mt-4"
		id="pictures"
		v-if="config.components.images.enabled"
	>
		Pictures (´｡• ω •｡`)
	</h2>
	<div
		class="masonry-grid"
		style="margin-top: 1rem"
		v-if="pics.length > 0 || picturesPending"
	>
		<div v-for="(image, index) in pics" :key="index" class="masonry-item">
			<a
				:href="`${config.components.images.url}/view/${image.Id}`"
				target="_blank"
			>
				<img
					:src="`${config.components.images.url}/view/${image.Id}?raw=true`"
					:alt="image.caption"
					class="rounded-lg w-full object-cover"
				/>
			</a>
		</div>
	</div>
</template>

<style scoped>
li {
	margin-bottom: 0.5rem;
}

li a {
	text-decoration: none;
}

li a:hover {
	text-decoration: underline;
}

li a::before {
	content: ' - ';
}

li a:visited {
	color: #4b5563;
}

li a:visited::before {
	content: ' x ';
}

.masonry-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	grid-auto-rows: 1fr;
	gap: 1rem;
}

.masonry-item {
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.image-masonry {
	/* Hide it */
	display: none;
}

.masonry-item img {
	width: 100%;
	height: auto;
	display: block;
}

#contact-info {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#contact-info span {
	margin-bottom: 0.5rem;
}

/* Add a separator between items, but not after the last one */
.separator:not(:last-child)::after {
	content: attr(data-separator);
}
</style>
