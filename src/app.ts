import png from "png.js";
import jsQR from "jsqr";
import $ from 'jquery';
import Jimp from 'jimp';


const fileReader = new FileReader();
const fileInput = document.getElementById("file");

// Sadly png.js doesn't return an array of pixel data, so we have to construct one by iterating over and calling getPixel
function convertPNGtoByteArray(pngData) {
    const data = new Uint8ClampedArray(pngData.width * pngData.height * 4);
    for (let y = 0; y < pngData.height; y++) {
        for (let x = 0; x < pngData.width; x++) {
            const pixelData = pngData.getPixel(x, y);

            data[(y * pngData.width + x) * 4 + 0] = pixelData[0];
            data[(y * pngData.width + x) * 4 + 1] = pixelData[1];
            data[(y * pngData.width + x) * 4 + 2] = pixelData[2];
            data[(y * pngData.width + x) * 4 + 3] = pixelData[3];
        }
    }
    return data;
}

fileReader.onload = function (event) {
    try {
        const pngReader = new png(event.target.result);

      
        pngReader.parse(function (err, pngData) {
            if (err) throw err;
            const pixelArray = convertPNGtoByteArray(pngData);
            const bb = jsQR(pixelArray, pngData.width, pngData.height);
            alert(bb?.data);
        });
    } catch (error) {
        alert(error)
    }
};

fileInput.onchange = function () {
    fileReader.readAsArrayBuffer(fileInput.files[0]);
};



/////////////////////////////////////////////

var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
}
$('#open').click(() => {
    if (!navigator.mediaDevices.getUserMedia) {
        alert('no')
        return;
    }
    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
    });
})
function tick() {
    loadingMessage.innerText = "⌛ Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
        if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            outputMessage.hidden = true;
            outputData.parentElement.hidden = false;
            outputData.innerText = code.data;
            alert(code.data)
        } else {
            outputMessage.hidden = false;
            outputData.parentElement.hidden = true;
        }
    }
    requestAnimationFrame(tick);
}
