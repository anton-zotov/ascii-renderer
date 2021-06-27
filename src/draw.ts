import { IColor } from './image-utils';
import { symbols } from './symbols';

export const symbolWidth = 3;
export const symbolHeight = 7;

let prevBlockCols: number;
let prevBlockRows: number;

export function draw(imageMatrix: IColor[][], colored: boolean): void {
    const blockCols = Math.floor(imageMatrix.length / symbolWidth);
    const blockRows = Math.floor(imageMatrix[0].length / symbolHeight);

    let blocks: number[][] = [];
    let colors: IColor[][] = [];
    let blockX = 0;
    let blockY = 0;

    for (let y = 0; y < blockRows * symbolHeight; y++) {
        for (let x = 0; x < blockCols * symbolWidth; x++) {
            const { r, g, b } = imageMatrix[x][y];
            const grayscale = (r + g + b) / 3;

            blockX = Math.floor(x / symbolWidth);
            blockY = Math.floor(y / symbolHeight);

            if (!blocks[blockY]) {
                blocks[blockY] = [];
                colors[blockY] = [];
            }
            if (!blocks[blockY][blockX]) blocks[blockY][blockX] = 0;
            blocks[blockY][blockX] += grayscale;
            colors[blockY][blockX] = { r, g, b, a: 0 };
        }
    }

    if (colored) {
        const col = document.getElementById('col-0-0');
        if (!col || prevBlockCols !== blockCols || prevBlockRows !== blockRows) {
            prepareLayout(blockCols, blockRows);
        }
        drawColored();
    } else {
        drawMonochrome();
    }

    function drawColored(): void {
        for (let i = 0; i < blocks[0].length; i++) {
            for (let j = 0; j < blocks.length; j++) {
                const col = document.getElementById(`col-${i}-${j}`);
                col.innerText = '█';
                col.style.color = `rgb(${colors[j][i].r}, ${colors[j][i].g}, ${colors[j][i].b})`;
            }
        }
    }

    function drawMonochrome(): void {
        let text = '';

        for (let line of blocks) {
            const normalized = line.map((density) =>
                Math.floor(
                    ((255 - density / symbolWidth / symbolHeight) / 255) *
                        Object.keys(symbols).length,
                ),
            );

            text += normalized.map((density) => symbols[density]).join('') + '<br />';
            document.getElementById('output').innerHTML = text;
        }
    }
}

function prepareLayout(blockCols: number, blockRows: number): void {
    prevBlockCols = blockCols;
    prevBlockRows = blockRows;

    document.getElementById('output').innerHTML = '';
    for (let j = 0; j < blockRows; j++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        document.getElementById('output').appendChild(row);
        for (let i = 0; i < blockCols; i++) {
            const col = document.createElement('span');
            col.setAttribute('id', `col-${i}-${j}`);
            col.setAttribute('class', 'col');
            row.appendChild(col);
        }
    }
}
