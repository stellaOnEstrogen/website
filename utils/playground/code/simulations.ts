export default function start() {
	langtonsAnt();
}

function langtonsAnt() {
	const gridSize = 20;
	const cellSize = 20;
	const playground = document.getElementById('playground-code') as HTMLElement;

	if (!playground) {
		console.error('Playground element not found');
		return;
	}

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
