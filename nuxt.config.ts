// https://nuxt.com/docs/api/configuration/nuxt-config

import { config } from './config';

function extToType(path: string) {
	const ext = path.split('.').pop();
	switch (ext) {
		case 'gif':
		case 'png':
		case 'jpg':
		case 'jpeg':
			return 'image/' + ext;
		case 'mp4':
			return 'video/mp4';
	}
}

export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	modules: ['@nuxt/ui', '@nuxtjs/seo', '@nuxt/content'],
	site: {
		url: config.url,
		name: config.name,
	},
	devServer: {
		port: 3000,
	},
	app: {
		head: {
			link: [
				{ rel: 'icon', type: extToType(config.avatar), href: config.avatar },
			],
		},
	},
	runtimeConfig: {
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
	},
});
