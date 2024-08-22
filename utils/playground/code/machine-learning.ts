export default function start() {
    knnVisualization();
    decisionTreeVisualization();
    linearRegressionVisualization();
    perceptronVisualization();
    kMeansVisualization();
}

export function knnVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'K-Nearest Neighbors Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    const kInput = document.createElement('input');
    kInput.type = 'number';
    kInput.placeholder = 'Enter k (number of neighbors)';
    kInput.value = '3';
    kInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'mb-4');
    playground.appendChild(kInput);

    const instructions = document.createElement('p');
    instructions.textContent = 'Click on the canvas to add a new point.';
    instructions.classList.add('text-gray-600', 'mb-4');
    playground.appendChild(instructions);

    let data = [
        { x: 100, y: 100, label: 0 },
        { x: 150, y: 150, label: 0 },
        { x: 300, y: 300, label: 1 },
        { x: 350, y: 350, label: 1 },
    ];

    let point = { x: 200, y: 200 };

    function drawPoints() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data.forEach(({ x, y, label }) => {
            ctx.fillStyle = label === 0 ? 'red' : 'blue';
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    function knnPredict(k: number, point: { x: number, y: number }) {
        const distances = data.map(({ x, y, label }) => ({
            dist: Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2),
            label
        }));

        distances.sort((a, b) => a.dist - b.dist);
        const nearestNeighbors = distances.slice(0, k);

        const counts = nearestNeighbors.reduce((acc: any, { label }) => {
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    }

    function updatePrediction() {
        const k = parseInt(kInput.value);
        const predictedLabel = knnPredict(k, point);
        drawPoints();
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Predicted Label: ${predictedLabel}`, 10, 20);
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const label = parseInt(prompt("Enter label for this point (0 or 1):", "0") || "0");
        if (label !== 0 && label !== 1) {
            alert("Invalid label! Please enter 0 or 1.");
            return;
        }

        data.push({ x, y, label });
        point = { x, y };
        updatePrediction();
    });

    kInput.addEventListener('input', updatePrediction);

    // Initial drawing and prediction
    drawPoints();
    updatePrediction();
}

export function decisionTreeVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Decision Tree Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    const data = [
        { x: 100, y: 100, label: 0 },
        { x: 150, y: 150, label: 0 },
        { x: 300, y: 300, label: 1 },
        { x: 350, y: 350, label: 1 },
    ];

    function drawPoints() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data.forEach(({ x, y, label }) => {
            ctx.fillStyle = label === 0 ? 'red' : 'blue';
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function classifyPoint(x: number, y: number) {
        if (x < 250 && y < 250) {
            return 0;
        } else {
            return 1;
        }
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const label = classifyPoint(x, y);
        data.push({ x, y, label });
        drawPoints();

        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Classified as: ${label}`, 10, 20);
    });

    // Initial drawing
    drawPoints();
}


export function linearRegressionVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Linear Regression Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let data = [] as { x: number; y: number }[];

    function drawPoints() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data.forEach(({ x, y }) => {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function linearRegression(data: { x: number; y: number }[]) {
        const n = data.length;
        const sumX = data.reduce((sum, point) => sum + point.x, 0);
        const sumY = data.reduce((sum, point) => sum + point.y, 0);
        const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
        const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return { slope, intercept };
    }

    function drawLine(slope: number, intercept: number) {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(0, intercept);
        ctx.lineTo(canvas.width, slope * canvas.width + intercept);
        ctx.stroke();
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        data.push({ x, y });
        drawPoints();

        if (data.length > 1) {
            const { slope, intercept } = linearRegression(data);
            drawLine(slope, intercept);
        }
    });

    // Initial drawing
    drawPoints();
}

export function perceptronVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Perceptron Learning Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let data = [] as { x: number; y: number; label: number }[];
    let weights = { w1: 0, w2: 0, bias: 0 };

    function drawPoints() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data.forEach(({ x, y, label }) => {
            ctx.fillStyle = label === 0 ? 'red' : 'blue';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function perceptronPredict(x: number, y: number) {
        const sum = weights.w1 * x + weights.w2 * y + weights.bias;
        return sum >= 0 ? 1 : 0;
    }

    function trainPerceptron() {
        data.forEach(({ x, y, label }) => {
            const prediction = perceptronPredict(x, y);
            const error = label - prediction;

            weights.w1 += error * x;
            weights.w2 += error * y;
            weights.bias += error;
        });
    }

    function drawLine() {
        const x1 = 0;
        const y1 = -(weights.bias / weights.w2);
        const x2 = canvas.width;
        const y2 = -(weights.w1 * x2 + weights.bias) / weights.w2;

        if (!ctx) {
            throw new Error('Could not get canvas context');
        }

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const label = parseInt(prompt("Enter label for this point (0 or 1):", "0") || "0");
        if (label !== 0 && label !== 1) {
            alert("Invalid label! Please enter 0 or 1.");
            return;
        }

        data.push({ x, y, label });
        drawPoints();
        trainPerceptron();
        drawLine();
    });

    // Initial drawing
    drawPoints();
}


export function kMeansVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'K-Means Clustering Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    let data = [] as { x: number; y: number }[];
    let centroids = [] as { x: number; y: number }[];

    function drawPoints() {
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        data.forEach(({ x, y }) => {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        centroids.forEach(({ x, y }, index) => {
            ctx.fillStyle = ['red', 'green', 'blue'][index % 3];
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function kMeans() {
        const k = 3;

        if (centroids.length === 0) {
            centroids = data.slice(0, k);
        }

        const assignments = data.map(point => {
            let minDist = Infinity;
            let assignedCluster = 0;

            centroids.forEach((centroid, index) => {
                const dist = Math.hypot(point.x - centroid.x, point.y - centroid.y);
                if (dist < minDist) {
                    minDist = dist;
                    assignedCluster = index;
                }
            });

            return assignedCluster;
        });

        centroids = centroids.map((_, index) => {
            const clusterPoints = data.filter((_, i) => assignments[i] === index);
            const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
            const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;

            return { x: avgX, y: avgY };
        });
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        data.push({ x, y });
        drawPoints();

        kMeans();
        drawPoints();
    });

    // Initial drawing
    drawPoints();
}
