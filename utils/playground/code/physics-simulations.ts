export default function start() {
    simplePendulum();
    doublePendulum();
    springMassSystem();
}

function simplePendulum() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Simple Pendulum';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const length = 150;
    let angle = Math.PI / 4;
    let angleVelocity = 0;
    const angleAcceleration = 0.01;
    let isDragging = false;

    function drawPendulum() {
		if (!ctx) {
			throw new Error('Could not get canvas context');
		}

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const originX = canvas.width / 2;
        const originY = 50;
        const bobX = originX + length * Math.sin(angle);
        const bobY = originY + length * Math.cos(angle);

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
        ctx.fill();

        if (!isDragging) {
            angleVelocity += -angleAcceleration * Math.sin(angle);
            angle += angleVelocity;
            angleVelocity *= 0.99; // damping
        }
    }

    function onMouseDown(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        const bobX = canvas.width / 2 + length * Math.sin(angle);
        const bobY = 50 + length * Math.cos(angle);

        const distance = Math.sqrt((mouseX - bobX) ** 2 + (mouseY - bobY) ** 2);

        if (distance < 20) {
            isDragging = true;
            canvas.addEventListener('mousemove', onMouseMove);
        }
    }

    function onMouseMove(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const originX = canvas.width / 2;
        const originY = 50;

        angle = Math.atan2(mouseX - originX, mouseY - originY);
    }

    function onMouseUp() {
        if (isDragging) {
            isDragging = false;
            canvas.removeEventListener('mousemove', onMouseMove);
        }
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);

    setInterval(drawPendulum, 1000 / 60);
}

function doublePendulum() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Double Pendulum';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const length1 = 100;
    const length2 = 100;
    let angle1 = Math.PI / 4;
    let angle2 = Math.PI / 3;
    let angleVelocity1 = 0;
    let angleVelocity2 = 0;
    const gravity = 1;
    let isDragging1 = false;
    let isDragging2 = false;

    function drawDoublePendulum() {
		if (!ctx) {
			throw new Error('Could not get canvas context');
		}

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const originX = canvas.width / 2;
        const originY = 50;

        const bob1X = originX + length1 * Math.sin(angle1);
        const bob1Y = originY + length1 * Math.cos(angle1);

        const bob2X = bob1X + length2 * Math.sin(angle2);
        const bob2Y = bob1Y + length2 * Math.cos(angle2);

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(bob1X, bob1Y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bob1X, bob1Y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(bob1X, bob1Y);
        ctx.lineTo(bob2X, bob2Y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bob2X, bob2Y, 10, 0, Math.PI * 2);
        ctx.fill();

        if (!isDragging1 && !isDragging2) {
            const num1 = -gravity * (2 * Math.sin(angle1) - Math.sin(angle2)) - length2 * angleVelocity2 * angleVelocity2 * Math.sin(angle1 - angle2);
            const num2 = length1 * angleVelocity1 * angleVelocity1 * Math.sin(angle1 - angle2);
            const den1 = length1 * (2 - Math.cos(2 * angle1 - 2 * angle2));
            const num3 = Math.sin(angle1 - angle2) * (length1 * Math.pow(angleVelocity1, 2) + length2 * Math.pow(angleVelocity2, 2));
            const den2 = length2 * (2 - Math.cos(2 * angle1 - 2 * angle2));

            const angleAcceleration1 = (num1 + num2) / den1;
            const angleAcceleration2 = num3 / den2;

            angleVelocity1 += angleAcceleration1;
            angleVelocity2 += angleAcceleration2;
            angle1 += angleVelocity1;
            angle2 += angleVelocity2;
        }
    }

    function onMouseDown(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const bob1X = canvas.width / 2 + length1 * Math.sin(angle1);
        const bob1Y = 50 + length1 * Math.cos(angle1);
        const bob2X = bob1X + length2 * Math.sin(angle2);
        const bob2Y = bob1Y + length2 * Math.cos(angle2);

        const distance1 = Math.sqrt((mouseX - bob1X) ** 2 + (mouseY - bob1Y) ** 2);
        const distance2 = Math.sqrt((mouseX - bob2X) ** 2 + (mouseY - bob2Y) ** 2);

        if (distance1 < 10) {
            isDragging1 = true;
            canvas.addEventListener('mousemove', onMouseMove1);
        } else if (distance2 < 10) {
            isDragging2 = true;
            canvas.addEventListener('mousemove', onMouseMove2);
        }
    }

    function onMouseMove1(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const originX = canvas.width / 2;
        const originY = 50;

        angle1 = Math.atan2(mouseX - originX, mouseY - originY);
    }

    function onMouseMove2(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const bob1X = canvas.width / 2 + length1 * Math.sin(angle1);
        const bob1Y = 50 + length1 * Math.cos(angle1);

        angle2 = Math.atan2(mouseX - bob1X, mouseY - bob1Y);
    }

    function onMouseUp() {
        if (isDragging1) {
            isDragging1 = false;
            canvas.removeEventListener('mousemove', onMouseMove1);
        }
        if (isDragging2) {
            isDragging2 = false;
            canvas.removeEventListener('mousemove', onMouseMove2);
        }
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);

    setInterval(drawDoublePendulum, 1000 / 60);
}

function springMassSystem() {
    const playground = document.getElementById('playground-code') as HTMLElement;

    if (!playground) {
        console.error('Playground element not found');
        return;
    }

    const header = document.createElement('h1');
    header.textContent = 'Spring-Mass System';
    header.classList.add('text-pink-600', 'text-2xl', 'mb-4');
    playground.appendChild(header);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    playground.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const originX = canvas.width / 2;
    const originY = 50;
    let springLength = 150;
    let isDragging = false;

    function drawSpringMass() {

		if (!ctx) {
			throw new Error('Could not get canvas context');
		}

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const massY = originY + springLength;

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX, massY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(originX, massY, 20, 0, Math.PI * 2);
        ctx.fill();

        if (!isDragging) {
            const gravity = 0.1;
            const k = 0.05; // spring constant
            const damping = 0.9;

            const acceleration = gravity - k * (springLength - 150);
            springLength += acceleration;
            springLength *= damping;
        }
    }

    function onMouseDown(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        const massY = originY + springLength;

        const distance = Math.sqrt((mouseX - originX) ** 2 + (mouseY - massY) ** 2);

        if (distance < 20) {
            isDragging = true;
            canvas.addEventListener('mousemove', onMouseMove);
        }
    }

    function onMouseMove(event: MouseEvent) {
        const mouseY = event.offsetY;

        springLength = mouseY - originY;
    }

    function onMouseUp() {
        if (isDragging) {
            isDragging = false;
            canvas.removeEventListener('mousemove', onMouseMove);
        }
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);

    setInterval(drawSpringMass, 1000 / 60);
}
