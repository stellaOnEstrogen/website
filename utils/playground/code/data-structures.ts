
export default function dataStructures() {
    bstVisualization();
    stackVisualization();
    queueVisualization();
    linkedListVisualization();
    minHeapVisualization();
}


export function bstVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Binary Search Tree Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    class Node {
        value: number;
        left: Node | null;
        right: Node | null;

        constructor(value: number) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    class BinarySearchTree {
        root: Node | null;

        constructor() {
            this.root = null;
        }

        insert(value: number) {
            const newNode = new Node(value);
            if (this.root === null) {
                this.root = newNode;
                this.drawTree();
                return;
            }
            this.insertNode(this.root, newNode);
            this.drawTree();
        }

        insertNode(node: Node, newNode: Node) {
            if (newNode.value < node.value) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    this.insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    this.insertNode(node.right, newNode);
                }
            }
        }

        drawTree(node: Node | null = this.root, x = canvas.width / 2, y = 30, angle = Math.PI / 2, depth = 0) {
            if (node === null || !ctx) return;

            const branchLength = 100 - depth * 20;
            const newX = x + branchLength * Math.cos(angle);
            const newY = y + branchLength * Math.sin(angle);

            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(newX, newY);
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(newX, newY, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(node.value), newX, newY);

            this.drawTree(node.left, newX, newY, angle - Math.PI / 4, depth + 1);
            this.drawTree(node.right, newX, newY, angle + Math.PI / 4, depth + 1);
        }
    }

    const bst = new BinarySearchTree();
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Enter values to insert (e.g. 50, 30, 70)';
    valueInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'mb-4');
    playground.appendChild(valueInput);

    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert';
    insertButton.classList.add('bg-pink-600', 'text-white', 'p-2', 'rounded');
    insertButton.addEventListener('click', () => {
        const values = valueInput.value.split(',').map(Number);
        values.forEach(value => bst.insert(value));
    });
    playground.appendChild(insertButton);
    const values = [50, 30, 70, 20, 40, 60, 80];

    function insertValues() {
        if (values.length === 0) return;

        const value = values.shift();
        if (value !== undefined) {
            bst.insert(value);
            setTimeout(insertValues, 1000);
        }
    }

    insertValues();
}

export function stackVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Stack Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    class Stack {
        elements: number[];

        constructor() {
            this.elements = [];
        }

        push(value: number) {
            this.elements.push(value);
            this.drawStack();
        }

        pop() {
            this.elements.pop();
            this.drawStack();
        }

        drawStack() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.elements.forEach((value, index) => {
                const y = canvas.height - (index + 1) * 40;
                ctx.fillStyle = 'lightblue';
                ctx.fillRect(50, y, 100, 30);
                ctx.strokeRect(50, y, 100, 30);

                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(value.toString(), 100, y + 15);
            });
        }
    }

    const stack = new Stack();
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Enter value';
    valueInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'mb-4');
    playground.appendChild(valueInput);

    const pushButton = document.createElement('button');
    pushButton.textContent = 'Push';
    pushButton.classList.add('bg-pink-600', 'text-white', 'p-2', 'rounded');
    pushButton.addEventListener('click', () => {
        const value = Number(valueInput.value);
        stack.push(value);
        valueInput.value = '';
    });
    playground.appendChild(pushButton);

    const popButton = document.createElement('button');
    popButton.textContent = 'Pop';
    popButton.classList.add('bg-red-600', 'text-white', 'p-2', 'rounded');
    popButton.addEventListener('click', () => stack.pop());
    playground.appendChild(popButton);
}


export function queueVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Queue Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    class Queue {
        elements: number[];

        constructor() {
            this.elements = [];
        }

        enqueue(value: number) {
            this.elements.push(value);
            this.drawQueue();
        }

        dequeue() {
            this.elements.shift();
            this.drawQueue();
        }

        drawQueue() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.elements.forEach((value, index) => {
                const x = 50 + index * 80;
                ctx.fillStyle = 'lightgreen';
                ctx.fillRect(x, 50, 60, 30);
                ctx.strokeRect(x, 50, 60, 30);

                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(value.toString(), x + 30, 65);
            });
        }
    }

    const queue = new Queue();
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Enter value';
    valueInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'mb-4');
    playground.appendChild(valueInput);

    const enqueueButton = document.createElement('button');
    enqueueButton.textContent = 'Enqueue';
    enqueueButton.classList.add('bg-pink-600', 'text-white', 'p-2', 'rounded');
    enqueueButton.addEventListener('click', () => {
        const value = Number(valueInput.value);
        queue.enqueue(value);
        valueInput.value = '';
    });
    playground.appendChild(enqueueButton);

    const dequeueButton = document.createElement('button');
    dequeueButton.textContent = 'Dequeue';
    dequeueButton.classList.add('bg-red-600', 'text-white', 'p-2', 'rounded');
    dequeueButton.addEventListener('click', () => queue.dequeue());
    playground.appendChild(dequeueButton);
}

export function linkedListVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Linked List Visualization';
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

    class Node {
        value: number;
        next: Node | null;

        constructor(value: number) {
            this.value = value;
            this.next = null;
        }
    }

    class LinkedList {
        head: Node | null;

        constructor() {
            this.head = null;
        }

        append(value: number) {
            const newNode = new Node(value);
            if (this.head === null) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next !== null) {
                    current = current.next;
                }
                current.next = newNode;
            }
            this.drawList();
        }

        remove() {
            if (this.head !== null) {
                this.head = this.head.next;
                this.drawList();
            }
        }

        drawList() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let current = this.head;
            let x = 50;

            while (current !== null) {
                ctx.fillStyle = 'lightcoral';
                ctx.fillRect(x, 100, 60, 30);
                ctx.strokeRect(x, 100, 60, 30);

                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(current.value.toString(), x + 30, 115);

                if (current.next !== null) {
                    ctx.beginPath();
                    ctx.moveTo(x + 60, 115);
                    ctx.lineTo(x + 80, 115);
                    ctx.stroke();
                }

                x += 80;
                current = current.next;
            }
        }
    }

    const list = new LinkedList();
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Enter value';
    valueInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'mb-4');
    playground.appendChild(valueInput);

    const appendButton = document.createElement('button');
    appendButton.textContent = 'Append';
    appendButton.classList.add('bg-pink-600', 'text-white', 'p-2', 'rounded');
    appendButton.addEventListener('click', () => {
        const value = Number(valueInput.value);
        list.append(value);
        valueInput.value = '';
    });
    playground.appendChild(appendButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('bg-red-600', 'text-white', 'p-2', 'rounded');
    removeButton.addEventListener('click', () => list.remove());
    playground.appendChild(removeButton);
}

export function minHeapVisualization() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Min-Heap Visualization';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    class MinHeap {
        heap: number[];

        constructor() {
            this.heap = [];
        }

        insert(value: number) {
            this.heap.push(value);
            this.heapifyUp(this.heap.length - 1);
            this.drawHeap();
        }

        remove() {
            if (this.heap.length === 0) return;
            const root = this.heap[0];
            this.heap[0] = this.heap.pop()!;
            this.heapifyDown(0);
            this.drawHeap();
            return root;
        }

        heapifyUp(index: number) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                this.heapifyUp(parentIndex);
            }
        }

        heapifyDown(index: number) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }

            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                this.heapifyDown(smallest);
            }
        }

        drawHeap() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const drawNode = (index: number, x: number, y: number, level: number) => {
                if (index >= this.heap.length) return;

                ctx.fillStyle = 'lightyellow';
                ctx.fillRect(x, y, 40, 30);
                ctx.strokeRect(x, y, 40, 30);

                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.heap[index].toString(), x + 20, y + 15);

                const offsetX = 60 / Math.pow(2, level + 1);
                const offsetY = 50;

                if (2 * index + 1 < this.heap.length) {
                    ctx.beginPath();
                    ctx.moveTo(x + 20, y + 30);
                    ctx.lineTo(x - offsetX + 20 + 20, y + offsetY);
                    ctx.stroke();
                    drawNode(2 * index + 1, x - offsetX, y + offsetY, level + 1);
                }

                if (2 * index + 2 < this.heap.length) {
                    ctx.beginPath();
                    ctx.moveTo(x + 20, y + 30);
                    ctx.lineTo(x + offsetX + 20 + 20, y + offsetY);
                    ctx.stroke();
                    drawNode(2 * index + 2, x + offsetX, y + offsetY, level + 1);
                }
            };

            drawNode(0, canvas.width / 2 - 20, 30, 0);
        }
    }

    const heap = new MinHeap();
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.placeholder = 'Enter value';
    valueInput.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'mb-4');
    playground.appendChild(valueInput);

    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert';
    insertButton.classList.add('bg-pink-600', 'text-white', 'p-2', 'rounded');
    insertButton.addEventListener('click', () => {
        const value = Number(valueInput.value);
        heap.insert(value);
        valueInput.value = '';
    });
    playground.appendChild(insertButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('bg-red-600', 'text-white', 'p-2', 'rounded');
    removeButton.addEventListener('click', () => heap.remove());
    playground.appendChild(removeButton);
}

