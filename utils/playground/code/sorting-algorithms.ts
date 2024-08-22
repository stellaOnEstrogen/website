export default function start() {
    bubbleSortVisualization();
    selectionSortVisualization();
    insertionSortVisualization();
    quickSortVisualization();
    mergeSortVisualization();
}

function animateArray(
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement,
    array: number[],
    arraySize: number,
    highlightIndices: number[] = [],
    delay: number = 100
) {

	if (!ctx) {
		throw new Error('Could not get canvas context');
	}

    return new Promise<void>((resolve) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        array.forEach((value, index) => {
            ctx.fillStyle = highlightIndices.includes(index) ? 'red' : 'black';
            ctx.fillRect(index * (canvas.width / arraySize), canvas.height - value * 2, canvas.width / arraySize, value * 2);
        });

        setTimeout(resolve, delay);
    });
}

export function bubbleSortVisualization() {
    const arraySize = 30;
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Bubble Sort Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 200;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    let i = 0;
    let j = 0;

    async function bubbleSortStep() {
        if (i < array.length) {
            if (j < array.length - i - 1) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            return;
        }

        await animateArray(ctx, canvas, array, arraySize, [j, j + 1], 50);
        bubbleSortStep();
    }

    animateArray(ctx, canvas, array, arraySize).then(bubbleSortStep);
}

export function selectionSortVisualization() {
    const arraySize = 30;
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Selection Sort Visualization';
    header.classList.add('text-blue-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 200;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    let i = 0;
    let j = 0;
    let minIndex = 0;

    async function selectionSortStep() {
        if (i < array.length) {
            if (j < array.length) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
                j++;
            } else {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                i++;
                j = i + 1;
                minIndex = i;
            }
        } else {
            return;
        }

        await animateArray(ctx, canvas, array, arraySize, [j, minIndex], 50);
        selectionSortStep();
    }

    animateArray(ctx, canvas, array, arraySize).then(selectionSortStep);
}

export function insertionSortVisualization() {
    const arraySize = 30;
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Insertion Sort Visualization';
    header.classList.add('text-green-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 200;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    let i = 1;
    let j = i;

    async function insertionSortStep() {
        if (i < array.length) {
            if (j > 0 && array[j] < array[j - 1]) {
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
                j--;
            } else {
                i++;
                j = i;
            }
        } else {
            return;
        }

        await animateArray(ctx, canvas, array, arraySize, [j], 50);
        insertionSortStep();
    }

    animateArray(ctx, canvas, array, arraySize).then(insertionSortStep);
}

export function quickSortVisualization() {
    const arraySize = 30;
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Quick Sort Visualization';
    header.classList.add('text-yellow-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 200;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    let stack: [number, number][] = [[0, array.length - 1]];
    let pivotIndex = 0;

    async function quickSortStep() {
        if (stack.length > 0) {
            const [low, high] = stack.pop()!;
            pivotIndex = partition(low, high);
            if (pivotIndex - 1 > low) stack.push([low, pivotIndex - 1]);
            if (pivotIndex + 1 < high) stack.push([pivotIndex + 1, high]);
        } else {
            return;
        }

        await animateArray(ctx, canvas, array, arraySize, [pivotIndex], 50);
        quickSortStep();
    }

    function partition(low: number, high: number): number {
        const pivot = array[high];
        let i = low;
        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                [array[i], array[j]] = [array[j], array[i]];
                i++;
            }
        }
        [array[i], array[high]] = [array[high], array[i]];
        return i;
    }

    animateArray(ctx, canvas, array, arraySize).then(quickSortStep);
}

export function mergeSortVisualization() {
    const arraySize = 30;
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Merge Sort Visualization';
    header.classList.add('text-purple-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 200;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    let auxArray = [...array];
    let currentSize = 1;
    let leftStart = 0;

    async function mergeSortStep() {
        if (currentSize <= array.length - 1) {
            if (leftStart < array.length - 1) {
                const mid = Math.min(leftStart + currentSize - 1, array.length - 1);
                const rightEnd = Math.min(leftStart + 2 * currentSize - 1, array.length - 1);
                merge(leftStart, mid, rightEnd);
                leftStart += 2 * currentSize;
            } else {
                leftStart = 0;
                currentSize *= 2;
            }
        } else {
            return;
        }

        await animateArray(ctx, canvas, array, arraySize, [], 50);
        mergeSortStep();
    }

    function merge(leftStart: number, mid: number, rightEnd: number) {
        let i = leftStart;
        let j = mid + 1;
        let k = leftStart;

        while (i <= mid && j <= rightEnd) {
            if (auxArray[i] <= auxArray[j]) {
                array[k++] = auxArray[i++];
            } else {
                array[k++] = auxArray[j++];
            }
        }

        while (i <= mid) array[k++] = auxArray[i++];
        while (j <= rightEnd) array[k++] = auxArray[j++];

        for (let index = leftStart; index <= rightEnd; index++) {
            auxArray[index] = array[index];
        }
    }

    animateArray(ctx, canvas, array, arraySize).then(mergeSortStep);
}
