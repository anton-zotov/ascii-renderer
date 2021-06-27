import { draw } from './draw';
import { getImageMatrix } from './image-utils';
import './main.css';
import { initCamera } from './camera';

initLayout();
initCamera(drawImageData);

let screenWidth: number;
let screenHeight: number;
let colored: boolean = false;

async function drawImageData(imageData: ImageData) {
    const imageMatrix = await getImageMatrix(imageData);
    draw(imageMatrix, colored);

    if (screenWidth !== document.body.offsetWidth || screenHeight !== document.body.offsetHeight) {
        adjustFontSize();
    }
}

function adjustFontSize(): void {
    screenWidth = document.body.offsetWidth;
    screenHeight = document.body.offsetHeight;

    const fontSizeW = (3.9 / 460) * screenWidth;
    const fontSizeH = (3.9 / 310) * screenHeight;
    document.body.style.fontSize = Math.min(fontSizeW, fontSizeH) + 'px';
}

function initLayout(): void {
    document.body.innerHTML += `
        <video id="video">Video stream not available.</video>
        <canvas id="canvas"></canvas>
        <div id="output"></div>
        <button id="colors-button">Enable colors</button>
    `;
    document.getElementById('colors-button').addEventListener('click', toggleColors);
}

function toggleColors(): void {
    colored = !colored;
    document.getElementById('colors-button').innerText = colored
        ? 'Disable colors'
        : 'Enable colors';
}
