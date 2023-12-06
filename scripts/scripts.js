"use strict"

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let canvasWidth;
let canvasHeight;
let mouse = {
    x: undefined,
    y: undefined
}

function init() {
    sizeCanvas();
}

function sizeCanvas() {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", sizeCanvas);

function createRGB() {
    let red = getRandomNumber(0, 255);
    let green = getRandomNumber(0, 255);
    let blue = getRandomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};