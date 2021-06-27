export function loadImage(source): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = source;
    });
}

export function getImageData(image: HTMLImageElement): ImageData {
    const canvas = new OffscreenCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, image.width, image.height);
}

export async function getImageMatrix(imageData: ImageData): Promise<IColor[][]> {
    const matrix: IColor[][] = [];

    for (let x = 0; x < imageData.width; x++) {
        matrix.push([]);
        for (let y = 0; y < imageData.height; y++) {
            matrix[x].push(getColor(x, y, imageData));
        }
    }

    return matrix;
}

export function getColor(x: number, y: number, imageData: ImageData): IColor {
    const redPos = Math.round(y) * (imageData.width * 4) + Math.round(x) * 4;
    const color: IColor = {
        r: imageData.data[redPos],
        g: imageData.data[redPos + 1],
        b: imageData.data[redPos + 2],
        a: imageData.data[redPos + 3],
    };
    if (!color.a) return { r: 0, g: 0, b: 0, a: 0 };
    return color;
}

export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
