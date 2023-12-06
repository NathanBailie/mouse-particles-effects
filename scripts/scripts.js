"use strict"

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let canvasWidth;
let canvasHeight;
let mouse = {
    x: undefined,
    y: undefined
};
let balls = [];

function init() {
    sizeCanvas();
    animationLoop()
}

function sizeCanvas() {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
}

function animationLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = 'lighter';
    drawBalls();

    let temp = [];

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].time <= balls[i].lifeTime) {
            temp.push(balls[i]);
        }
    }
    balls = temp;
    requestAnimationFrame(animationLoop);
}

function drawBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }
}

class Ball {
    constructor() {
        this.start = {
            x: mouse.x + getRandomNumber(-20, 20),
            y: mouse.y + getRandomNumber(-20, 20),
            size: getRandomNumber(25, 40)
        };

        this.end = {
            x: this.start.x + getRandomNumber(-300, 300),
            y: this.start.y + getRandomNumber(-300, 300)
        };

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.style = createRGB()
        this.time = 0;
        this.lifeTime = 130;
    }

    draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        if (this.time <= this.lifeTime) {
            let progress = 1 - (this.lifeTime - this.time) / this.lifeTime;

            this.size = this.start.size * (1 - easeOutQuart(progress));
            this.x = this.x + (this.end.x - this.x) * 0.01;
            this.y = this.y + (this.end.y - this.y) * 0.01;
        }

        this.time++;
    }
}

function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 3; i++) {
        balls.push(new Ball());
    }
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", sizeCanvas);
window.addEventListener('mousemove', mousemove);
window.addEventListener('mouseout', mouseout);


function createRGB() {
    let red = getRandomNumber(0, 255);
    let green = getRandomNumber(0, 255);
    let blue = getRandomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 3);
}