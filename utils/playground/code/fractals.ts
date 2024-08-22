export default function fractalPlayground() {
	const canvasSize = 400;
	const playground = document.getElementById('playground-code') as HTMLElement;

	if (!playground) {
		console.error('Playground element not found');
		return;
	}

	const header = document.createElement('h1');
	header.textContent = 'Fractal Playground';
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

	// Koch Snowflake
	function drawKochSnowflake(depth: number) {
		function drawLine(x1: number, y1: number, x2: number, y2: number, depth: number) {
			if (depth === 0) {
                if (!ctx) {
                    throw new Error('Could not get canvas context');
                }
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			} else {
				const dx = (x2 - x1) / 3;
				const dy = (y2 - y1) / 3;
				const mx1 = x1 + dx;
				const my1 = y1 + dy;
				const mx2 = x2 - dx;
				const my2 = y2 - dy;
				const peakX = mx1 + (dx - Math.sqrt(3) * dy) / 2;
				const peakY = my1 + (dy + Math.sqrt(3) * dx) / 2;

				drawLine(x1, y1, mx1, my1, depth - 1);
				drawLine(mx1, my1, peakX, peakY, depth - 1);
				drawLine(peakX, peakY, mx2, my2, depth - 1);
				drawLine(mx2, my2, x2, y2, depth - 1);
			}
		}

		const size = canvasSize / 3;
		const height = size * Math.sqrt(3) / 2;

		const x1 = (canvasSize - size) / 2;
		const y1 = (canvasSize + height) / 2;
		const x2 = x1 + size;
		const y2 = y1;
		const x3 = (x1 + x2) / 2;
		const y3 = y1 - height;

		drawLine(x1, y1, x2, y2, depth);
		drawLine(x2, y2, x3, y3, depth);
		drawLine(x3, y3, x1, y1, depth);
	}

	// Sierpinski Triangle
	function drawSierpinskiTriangle(x: number, y: number, size: number, depth: number) {
		if (depth === 0) {
            if (!ctx) {
                throw new Error('Could not get canvas context');
            }

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + size, y);
			ctx.lineTo(x + size / 2, y - size * Math.sqrt(3) / 2);
			ctx.closePath();
			ctx.fill();
		} else {
			const newSize = size / 2;
			drawSierpinskiTriangle(x, y, newSize, depth - 1);
			drawSierpinskiTriangle(x + newSize, y, newSize, depth - 1);
			drawSierpinskiTriangle(x + newSize / 2, y - newSize * Math.sqrt(3) / 2, newSize, depth - 1);
		}
	}

	// Mandelbrot Set
	function drawMandelbrotSet(maxIterations: number) {
		const magnificationFactor = 200;
		const panX = 2;
		const panY = 1.5;

		for (let x = 0; x < canvasSize; x++) {
			for (let y = 0; y < canvasSize; y++) {
				let zx = (x / magnificationFactor) - panX;
				let zy = (y / magnificationFactor) - panY;
				let cx = zx;
				let cy = zy;

				let iteration = maxIterations;
				while (zx * zx + zy * zy < 4 && iteration > 0) {
					const tmp = zx * zx - zy * zy + cx;
					zy = 2.0 * zx * zy + cy;
					zx = tmp;
					iteration--;
				}
                if (!ctx) {
                    throw new Error('Could not get canvas context');
                }

				const color = iteration === 0 ? 0 : (iteration * 16) % 255;
				ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}

	// Control panel for fractal selection
	const fractalSelect = document.createElement('select');
	fractalSelect.classList.add('border', 'border-gray-300', 'rounded', 'p-2', 'mb-4');

	const kochOption = document.createElement('option');
	kochOption.value = 'koch';
	kochOption.textContent = 'Koch Snowflake';
	fractalSelect.appendChild(kochOption);

	const sierpinskiOption = document.createElement('option');
	sierpinskiOption.value = 'sierpinski';
	sierpinskiOption.textContent = 'Sierpinski Triangle';
	fractalSelect.appendChild(sierpinskiOption);

	const mandelbrotOption = document.createElement('option');
	mandelbrotOption.value = 'mandelbrot';
	mandelbrotOption.textContent = 'Mandelbrot Set';
	fractalSelect.appendChild(mandelbrotOption);

	playground.appendChild(fractalSelect);

	const numberInput = document.createElement('input');
	numberInput.type = 'number';
	numberInput.value = '5';
	numberInput.min = '0';
	numberInput.max = '10';
	numberInput.classList.add('border', 'border-gray-300', 'rounded', 'p-2', 'mb-4');
	playground.appendChild(numberInput);

	function drawFractal() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        
		ctx.clearRect(0, 0, canvasSize, canvasSize);
		const depth = parseInt(numberInput.value);

		switch (fractalSelect.value) {
			case 'koch':
				drawKochSnowflake(depth);
				break;
			case 'sierpinski':
				drawSierpinskiTriangle(canvasSize / 4, canvasSize * 3 / 4, canvasSize / 2, depth);
				break;
			case 'mandelbrot':
				drawMandelbrotSet(depth * 10 + 50); // Adjust depth for Mandelbrot
				break;
		}
	}

	numberInput.addEventListener('input', drawFractal);
	fractalSelect.addEventListener('change', drawFractal);

	drawFractal(); // Initial draw
}
