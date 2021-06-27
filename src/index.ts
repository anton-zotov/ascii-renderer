import { draw } from './draw';
import { getImageMatrix } from './image-utils';
import './main.css';
import { initCamera } from './camera';

initLayout();
initCamera(drawImageData);

async function drawImageData(imageData: ImageData) {
    const imageMatrix = await getImageMatrix(imageData);
    draw(imageMatrix);
}

function initLayout() {
    document.body.innerHTML += `
        <video id="video">Video stream not available.</video>
        <canvas id="canvas"></canvas>
        <div id="output"></div>
    `;
}
