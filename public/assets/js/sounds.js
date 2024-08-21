const SOUND_FILES = {
	BTN_CLICK: '/assets/sounds/btn-click.wav',
	BTN_HOVER: '/assets/sounds/btn-hover.wav',
	PAGE_BG_MUSIC: '/assets/sounds/page.mp3',
};

let canPlayAudio = false;
let backgroundMusic = null;

function playSound(soundFile) {
	if (!canPlayAudio) return;

	const audio = new Audio(soundFile);
	audio.volume = 0.2;
	audio.play().catch((error) => {
		console.error('Audio playback failed:', error);
	});
}

function addSoundEvents(elements, events) {
	elements.forEach((element) => {
		events.forEach(({ event, sound }) => {
			element.addEventListener(event, () => playSound(SOUND_FILES[sound]));
		});
	});
}

function toggleBackgroundMusic() {
	backgroundMusic.muted = !backgroundMusic.muted;
	localStorage.setItem('bgMusicMuted', backgroundMusic.muted);
	updateBgMusicToggleText();
}

function updateBgMusicToggleText() {
	const bgMusicToggle = document.querySelector('#toggle-bg-music');
	if (bgMusicToggle) {
		bgMusicToggle.textContent = backgroundMusic.muted ? 'BGM 🔇' : 'BGM 🔊';
	}
}

function enableAudioPlayback() {
	canPlayAudio = true;
	if (backgroundMusic && backgroundMusic.paused) {
		backgroundMusic.play().catch((error) => {
			console.error('Background music playback failed:', error);
		});
	}
}

function initBackgroundMusic() {
	backgroundMusic = new Audio(SOUND_FILES.PAGE_BG_MUSIC);
	backgroundMusic.loop = true;
	backgroundMusic.volume = 0.2;

	const isMuted = localStorage.getItem('bgMusicMuted') === 'true';
	backgroundMusic.muted = isMuted;
	updateBgMusicToggleText();

	const savedTime = parseFloat(
		localStorage.getItem('bgMusicCurrentTime') || '0',
	);
	if (!isNaN(savedTime)) {
		backgroundMusic.currentTime = savedTime;
	}

	backgroundMusic
		.play()
		.then(() => {
			canPlayAudio = true;
		})
		.catch(() => {
			console.warn(
				'Autoplay blocked. Waiting for user interaction to play background music.',
			);
			document.addEventListener('click', enableAudioPlayback, { once: true });
			document.addEventListener('keydown', enableAudioPlayback, { once: true });
		});
}

function initSoundEffects() {
	const buttons = document.querySelectorAll('button');
	const links = document.querySelectorAll('a');

	const events = [
		{ event: 'click', sound: 'BTN_CLICK' },
		{ event: 'mouseover', sound: 'BTN_HOVER' },
	];

	addSoundEvents(buttons, events);
	addSoundEvents(links, events);
}

function handleVisibilityChange() {
	if (document.visibilityState === 'hidden') {
		backgroundMusic.pause();
	} else {
		backgroundMusic.play().catch((error) => {
			console.error('Background music playback failed:', error);
		});
	}
}

function saveMusicState() {
	localStorage.setItem('bgMusicCurrentTime', backgroundMusic.currentTime);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		initBackgroundMusic();
		initSoundEffects();

		const bgMusicToggle = document.querySelector('#toggle-bg-music');
		if (bgMusicToggle) {
			bgMusicToggle.addEventListener('click', toggleBackgroundMusic);
		}
	} catch (error) {
		console.error('Error initializing sounds:', error);
	}
});

document.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('beforeunload', saveMusicState);
