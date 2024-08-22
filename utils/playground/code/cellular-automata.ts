export default function cellularAutomataVisualization() {
    const width = 50;
    const height = 50;
    const cellSize = 10;

    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Cellular Automata Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = width * cellSize;
    canvas.height = height * cellSize;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let grid = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => Math.round(Math.random()))
    );

    function drawGrid() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                ctx.fillStyle = grid[y][x] ? 'black' : 'white';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    function getNeighbors(x: number, y: number) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        return directions.reduce((sum, [dx, dy]) => {
            const newX = (x + dx + width) % width;
            const newY = (y + dy + height) % height;
            return sum + grid[newY][newX];
        }, 0);
    }

    function step() {
        const newGrid = grid.map((row, y) => row.map((cell, x) => {
            const neighbors = getNeighbors(x, y);
            if (cell && (neighbors === 2 || neighbors === 3)) return 1;
            if (!cell && neighbors === 3) return 1;
            return 0;
        }));
        grid = newGrid;
        drawGrid();
    }

    setInterval(step, 100);
    drawGrid();
}
