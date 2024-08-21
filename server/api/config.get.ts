import { config } from '~/config';

export default defineEventHandler((event) => {
	return config;
});
