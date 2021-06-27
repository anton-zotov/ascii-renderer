import { draw } from './draw';
import { getImageMatrix } from './image-utils';
import './main.css';
import { initCamera } from './camera';

initLayout();
initCamera(drawImageData);

let screenWidth: number;
let screenHeight: number;

async function drawImageData(imageData: ImageData) {
    const imageMatrix = await getImageMatrix(imageData);
    draw(imageMatrix);

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
    `;
}
