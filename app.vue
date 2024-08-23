<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { config } from './config';
const router = useRouter();

const cherryBlossomVisible = ref<boolean>(true);
const currentTime = ref<string | null>(null);

const updateTime = (fromInit = false) => {
	const timezone = config.timezone;
	const date = new Date();
	const options: Intl.DateTimeFormatOptions = {
		timeZone: timezone,
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	if (!fromInit) {
		currentTime.value = `🕛 ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
	}

	currentTime.value = `🕛 ${new Intl.DateTimeFormat('en-US', options).format(date)}`;

	const now = date.getTime();
	const nextMinute = Math.ceil(now / 60000) * 60000;
	const delay = nextMinute - now;

	setTimeout(updateTime, delay);
};

useHead({
	link: [
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&family=Noto+Sans+JP:wght@400;700&display=swap',
		},
		{
			rel: 'stylesheet',
			href: '/assets/css/app.css',
		},
	],
	script: [
		{
			src: '/assets/js/sounds.js',
			type: 'text/javascript',
		},
	],
	meta: [
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0',
		},
		{
			name: 'description',
			content: config.about,
		},
		{
			name: 'twitter:description',
			content: config.about,
		},
	],
});

updateTime();

onMounted(() => {
	const bgMusic = document.querySelector(
		'#toggle-bg-music',
	) as HTMLButtonElement;
	const hasBGMMuted = window.localStorage.getItem('bgMusicMuted') === 'true';

	bgMusic.textContent = hasBGMMuted ? 'BGM 🔇' : 'BGM 🔊';

	const canvas = document.querySelector('#sakura') as HTMLCanvasElement;
	const cherryBlossomToggle = document.querySelector(
		'#cherry-blossom-toggle',
	) as HTMLButtonElement;

	const updateCanvasDisplay = () => {
		canvas.style.display = cherryBlossomVisible.value ? 'block' : 'none';
		window.localStorage.setItem(
			'cherryBlossom',
			cherryBlossomVisible.value ? 'block' : 'none',
		);
		cherryBlossomToggle.textContent = `${cherryBlossomVisible.value ? 'Hide' : 'Show'} Cherry Blossoms`;
		if (cherryBlossomVisible.value) {
			initializeSakura(canvas);
		} else {
			canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
		}
	};

	cherryBlossomVisible.value =
		window.localStorage.getItem('cherryBlossom') !== 'none';
	updateCanvasDisplay();

	cherryBlossomToggle.addEventListener('click', () => {
		cherryBlossomVisible.value = !cherryBlossomVisible.value;
		updateCanvasDisplay();
	});

	if (cherryBlossomVisible.value) {
		initializeSakura(canvas);
	}
});

function initializeSakura(canvas: HTMLCanvasElement) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	const petalImg = new Image();
	petalImg.src = '/assets/images/petal.png';
	const TOTAL = 100;
	const petalArray: Petal[] = [];

	petalImg.addEventListener('load', () => {
		for (let i = 0; i < TOTAL; i++) {
			petalArray.push(new Petal(canvas, ctx, petalImg));
		}
		render();
	});

	const render = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		petalArray.forEach((petal) => petal.animate());
		window.requestAnimationFrame(render);
	};

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	class Petal {
		x: number;
		y: number;
		w: number;
		h: number;
		opacity: number;
		flip: number;
		xSpeed: number;
		ySpeed: number;
		flipSpeed: number;

		constructor(
			private canvas: HTMLCanvasElement,
			private ctx: CanvasRenderingContext2D,
			private petalImg: HTMLImageElement,
		) {
			this.x = Math.random() * this.canvas.width;
			this.y = Math.random() * this.canvas.height * 2 - this.canvas.height;
			this.w = 25 + Math.random() * 15;
			this.h = 20 + Math.random() * 10;
			this.opacity = this.w / 40;
			this.flip = Math.random();

			this.xSpeed = 1.5 + Math.random() * 2;
			this.ySpeed = 1.5 + Math.random() * 2;
			this.flipSpeed = Math.random() * 0.03;
		}

		draw() {
			if (this.y > this.canvas.height || this.x > this.canvas.width) {
				this.x = -this.petalImg.width;
				this.y = Math.random() * this.canvas.height * 2 - this.canvas.height;
				this.xSpeed = 1.5 + Math.random() * 2;
				this.ySpeed = 1.5 + Math.random() * 2;
				this.flip = Math.random();
			}
			this.ctx.globalAlpha = this.opacity;
			this.ctx.drawImage(
				this.petalImg,
				this.x,
				this.y,
				this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
				this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5),
			);
		}

		animate() {
			this.x += this.xSpeed;
			this.y += this.ySpeed;
			this.flip += this.flipSpeed;
			this.draw();
		}
	}
}

const isIndex = router.currentRoute.value.path === '/';
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-8 flex flex-col items-center relative"
	>
		<canvas
			id="sakura"
			class="fixed inset-0 w-full h-full z-0 pointer-events-none"
		></canvas>
		<div
			class="max-w-xl w-full bg-white rounded-lg shadow-lg overflow-hidden z-10"
			style="margin-top: 3rem; border-radius: 1rem"
		>
			<div class="bg-pink-300 p-6 text-center">
				<UAvatar :src="config.avatar" size="3xl" class="mx-auto" />
				<h1 class="text-4xl font-semibold text-gray-800 mt-4">
					{{ config.name }}
				</h1>
				<p class="text-md text-gray-600 mt-2" id="header_location">
					📍 {{ config.location }}
					<span class="text-gray-600">{{ currentTime }}</span>
				</p>
				<div id="page-actions">
					<UButton color="pink" variant="solid" id="cherry-blossom-toggle"
						>Toggle Cherry Blossoms</UButton
					>
					<UButton color="pink" variant="solid" id="toggle-bg-music"
						>BGM 🔊</UButton
					>
				</div>

				<div class="flex justify-center mt-4 space-x-4">
					<!-- Home -->
					<div v-if="!isIndex">
						<nuxt-link to="/" class="text-blue-600">Home</nuxt-link>
					</div>

					<nuxt-link v-for="(link, index) in config.frontLinks"
						:key="index"
						:to="link.href"
						class="text-blue-600"
						>{{ link.name }}</nuxt-link>
				</div>
			</div>
			<div class="p-6 bg-white" id="page-content">
				<NuxtPage />
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Apply Sawarabi Mincho to headings */
h1,
h2 {
	font-family: 'Sawarabi Mincho', serif;
}

/* Apply Noto Sans JP to general text */
p,
#page-content {
	font-family: 'Sawarabi Mincho', serif;
}

/* Additional styling */
#page-content h2 {
	font-family: 'Sawarabi Mincho', serif;
	text-align: center;
}

#page-content h2:not(:first-child) {
	padding-top: 2rem;
}

.text-center {
	text-align: center;
}

.text-2xl {
	font-size: 1.5rem;
}

.font-semibold {
	font-weight: 600;
}

.text-pink-600 {
	color: #d946ef;
}

.text-gray-700 {
	color: #4b5563;
}

.mt-4 {
	margin-top: 1rem;
}

canvas {
	pointer-events: none;
}

#page-actions {
	display: flex;
	justify-content: center;
	gap: 1rem;
	margin-top: 1rem;
}

button {
	font-family: 'Sawarabi Mincho', serif;
}

a {
	font-family: 'Sawarabi Mincho', serif;
}
</style>
