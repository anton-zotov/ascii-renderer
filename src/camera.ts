export function initCamera(imageCallback: (image: ImageData) => void): void {
    const width = 640;
    const height = 480;

    const video = document.getElementById('video') as HTMLVideoElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();

            requestAnimationFrame(sendImage);
        })
        .catch((err) => {
            console.log('An error occurred: ' + err);
        });

    function sendImage() {
        context.drawImage(video, 0, 0, width, height);
        imageCallback(context.getImageData(0, 0, width, height));
        requestAnimationFrame(sendImage);
    }
}
