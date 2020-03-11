import QrScanner from "./qr-scanner.min.js";
import $ from 'jquery'
((navigator,window,document,$)=>{
    QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

    const video = document.getElementById('qr-video');
    const camHasCamera = document.getElementById('cam-has-camera');
    const camQrResult = document.getElementById('cam-qr-result');
    const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
    const fileSelector = document.getElementById('file-selector');
    const fileQrResult = document.getElementById('file-qr-result');
    const checkUserMedia=()=>{
        return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    }
    function setResult(label, result) {
        alert(result)
        label.textContent = result;
        camQrResultTimestamp.textContent = new Date().toString();
        label.style.color = 'teal';
        clearTimeout(label.highlightTimeout);
        label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
    }
    
    // ####### Web Cam Scanning #######
    
    if (checkUserMedia()) {
        QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);
    
        const scanner = new QrScanner(video, result => setResult(camQrResult, result));
        scanner.start();
    
        document.getElementById('inversion-mode-select').addEventListener('change', event => {
            scanner.setInversionMode(event.target.value);
        });
    }else{
        $('#scan-web-cam').hide();
    }
    
    
    // ####### File Scanning #######
    
    fileSelector.addEventListener('change', event => {
        const file = fileSelector.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file)
            .then(result => setResult(fileQrResult, result))
            .catch(e => setResult(fileQrResult, e || 'No QR code found.'));
    });


})(navigator,window,document,$)
