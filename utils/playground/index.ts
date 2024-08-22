export const PlaygroundItems = [
	{
		title: 'Simulations',
		slug: 'simulations',
		description:
			"Simulations are a great way to learn and understand complex systems. Here are some simulations that I've created.",
		module: import('./code/simulations'),
		github:
			'https://github.com/stellaOnEstrogen/website/blob/main/utils/playground/code/simulations.ts',
	},
	{
		title: 'Fractals',
		slug: 'fractals',
		description:
			"Fractals demonstrate the beauty of mathematical patterns that repeat at every scale. Explore various fractals and see how they are generated.",
		module: import('./code/fractals'),
		github:
			'https://github.com/stellaOnEstrogen/website/blob/main/utils/playground/code/fractals.ts',
	},
	{
		title: 'Sorting Algorithms',
		slug: 'sorting-algorithms',
		description:
			"Sorting algorithms are fundamental in computer science. This section demonstrates different sorting techniques and visualizes how they work.",
		module: import('./code/sorting-algorithms'),
		github:
			'https://github.com/stellaOnEstrogen/website/blob/main/utils/playground/code/sorting-algorithms.ts',
	},
	{
		title: 'Physics Simulations',
		slug: 'physics-simulations',
		description:
			"Physics simulations bring the laws of nature to life. From simple projectile motion to complex fluid dynamics, explore the world of physics.",
		module: import('./code/physics-simulations'),
		github:
			'https://github.com/stellaOnEstrogen/website/blob/main/utils/playground/code/physics-simulations.ts',
	},
];
