export default function start() {
	langtonsAnt();
	conwaysGameOfLife();
	randomWalk();
	sierpinskiTriangle();
}


function langtonsAnt() {
	const gridSize = 20;
	const cellSize = 20;
	const playground = document.getElementById('playground-code') as HTMLElement;

	if (!playground) {
		console.error('Playground element not found');
		return;
	}

	const header = document.createElement('h1');
	header.textContent = 'Langton\'s Ant';
	header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
	playground.appendChild(header);


	const canvas = document.createElement('canvas');
	canvas.width = gridSize * cellSize;
	canvas.height = gridSize * cellSize;
	playground.appendChild(canvas);

	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Could not get canvas context');
	}

	// Set up the grid
	const grid: boolean[][] = Array.from({ length: gridSize }, () =>
		Array(gridSize).fill(false),
	);

	// Define the ant class
	enum Direction {
		Up,
		Right,
		Down,
		Left,
	}

	class Ant {
		x: number;
		y: number;
		direction: Direction;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.direction = Direction.Up;
		}

		move() {
			switch (this.direction) {
				case Direction.Up:
					this.y = (this.y - 1 + gridSize) % gridSize;
					break;
				case Direction.Right:
					this.x = (this.x + 1) % gridSize;
					break;
				case Direction.Down:
					this.y = (this.y + 1) % gridSize;
					break;
				case Direction.Left:
					this.x = (this.x - 1 + gridSize) % gridSize;
					break;
			}
		}

		turnRight() {
			this.direction = (this.direction + 1) % 4;
		}

		turnLeft() {
			this.direction = (this.direction + 3) % 4;
		}
	}

	const ant = new Ant(Math.floor(gridSize / 2), Math.floor(gridSize / 2));

	function drawGrid() {
		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				if (!ctx) {
					throw new Error('Could not get canvas context');
				}
				ctx.fillStyle = grid[y][x] ? 'black' : 'white';
				ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}
	}

	function update() {
		const currentCell = grid[ant.y][ant.x];
		grid[ant.y][ant.x] = !currentCell;

		if (currentCell) {
			ant.turnLeft();
		} else {
			ant.turnRight();
		}

		ant.move();
		drawGrid();
	}

	drawGrid(); // Initial draw
	setInterval(update, 100);
}

function conwaysGameOfLife() {
	const gridSize = 20;
	const cellSize = 20;
	const playground = document.getElementById('playground-code') as HTMLElement;

	if (!playground) {
		console.error('Playground element not found');
		return;
	}

	const header = document.createElement('h1');
	header.textContent = "Conway's Game of Life";
	header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
	playground.appendChild(header);

	const canvas = document.createElement('canvas');
	canvas.width = gridSize * cellSize;
	canvas.height = gridSize * cellSize;
	playground.appendChild(canvas);

	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Could not get canvas context');
	}

	let grid: boolean[][] = Array.from({ length: gridSize }, () =>
		Array(gridSize).fill(false),
	);

	// Randomly populate the grid
	for (let y = 0; y < gridSize; y++) {
		for (let x = 0; x < gridSize; x++) {
			grid[y][x] = Math.random() > 0.7;
		}
	}

	function drawGrid() {
		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				if (!ctx) {
					throw new Error('Could not get canvas context');
				}
				ctx.fillStyle = grid[y][x] ? 'black' : 'white';
				ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}
	}

	function getNeighborCount(x: number, y: number) {
		let count = 0;
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (dx === 0 && dy === 0) continue;
				const nx = (x + dx + gridSize) % gridSize;
				const ny = (y + dy + gridSize) % gridSize;
				if (grid[ny][nx]) count++;
			}
		}
		return count;
	}

	function update() {
		const newGrid = grid.map((row, y) =>
			row.map((cell, x) => {
				const neighbors = getNeighborCount(x, y);
				if (cell) {
					return neighbors === 2 || neighbors === 3;
				} else {
					return neighbors === 3;
				}
			}),
		);

		grid = newGrid;
		drawGrid();
	}

	drawGrid(); // Initial draw
	setInterval(update, 100);
}

function randomWalk() {
	const gridSize = 20;
	const cellSize = 20;
	const playground = document.getElementById('playground-code') as HTMLElement;

	if (!playground) {
		console.error('Playground element not found');
		return;
	}

	const header = document.createElement('h1');
	header.textContent = 'Random Walk';
	header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
	playground.appendChild(header);

	const canvas = document.createElement('canvas');
	canvas.width = gridSize * cellSize;
	canvas.height = gridSize * cellSize;
	playground.appendChild(canvas);

	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Could not get canvas context');
	}

	// Set up the grid
	const grid: boolean[][] = Array.from({ length: gridSize }, () =>
		Array(gridSize).fill(false),
	);

	let x = Math.floor(gridSize / 2);
	let y = Math.floor(gridSize / 2);

	function drawGrid() {
		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				if (!ctx) {
					throw new Error('Could not get canvas context');
				}
				ctx.fillStyle = grid[y][x] ? 'black' : 'white';
				ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}
	}

	function update() {
		grid[y][x] = true;

		const direction = Math.floor(Math.random() * 4);
		switch (direction) {
			case 0:
				y = (y - 1 + gridSize) % gridSize;
				break;
			case 1:
				x = (x + 1) % gridSize;
				break;
			case 2:
				y = (y + 1) % gridSize;
				break;
			case 3:
				x = (x - 1 + gridSize) % gridSize;
				break;
		}

		drawGrid();
	}

	drawGrid(); // Initial draw
	setInterval(update, 100);
}


function sierpinskiTriangle() {
	const canvasSize = 400;
	const playground = document.getElementById('playground-code') as HTMLElement;

	if (!playground) {
		console.error('Playground element not found');
		return;
	}

	const header = document.createElement('h1');
	header.textContent = 'Sierpinski Triangle';
	header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
	playground.appendChild(header);

	const canvas = document.createElement('canvas');
	canvas.width = canvasSize;
	canvas.height = canvasSize;
	playground.appendChild(canvas);

	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Could not get canvas context');
	}

	function drawTriangle(x: number, y: number, size: number) {
		if (size < 1) return;

		if (!ctx) {
			throw new Error('Could not get canvas context');
		}

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + size / 2, y - size * Math.sin(Math.PI / 3));
		ctx.lineTo(x + size, y);
		ctx.closePath();
		ctx.stroke();

		// Recursive calls
		drawTriangle(x, y, size / 2);
		drawTriangle(x + size / 2, y, size / 2);
		drawTriangle(x + size / 4, y - (size * Math.sin(Math.PI / 3)) / 2, size / 2);
	}

	drawTriangle(50, 350, 300);
}
