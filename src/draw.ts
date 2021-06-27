import { IColor } from './image-utils';
import { symbolWidth, symbolHeight, symbols } from './symbols';

export function draw(imageMatrix: IColor[][]): void {
    const blockCols = Math.floor(imageMatrix.length / symbolWidth);
    const blockRows = Math.floor(imageMatrix[0].length / symbolHeight);
    let blocks: number[][] = [];
    let blockX = 0;
    let blockY = 0;

    for (let y = 0; y < blockRows * symbolHeight; y++) {
        for (let x = 0; x < blockCols * symbolWidth; x++) {
            const { r, g, b } = imageMatrix[x][y];
            const grayscale = (r + g + b) / 3;

            blockX = Math.floor(x / symbolWidth);
            blockY = Math.floor(y / symbolHeight);

            if (!blocks[blockY]) blocks[blockY] = [];
            if (!blocks[blockY][blockX]) blocks[blockY][blockX] = 0;
            blocks[blockY][blockX] += grayscale;
        }
    }

    document.getElementById('output').innerHTML = '';
    for (let line of blocks) {
        const normalized = line.map((density) =>
            Math.floor(
                ((255 - density / symbolWidth / symbolHeight) / 255) * Object.keys(symbols).length,
            ),
        );
        document.getElementById('output').innerHTML +=
            normalized.map((density) => symbols[density]).join('') + '<br />';
    }
}
