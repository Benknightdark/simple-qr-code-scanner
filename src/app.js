import QrScanner from "./qr-scanner.min.js";
// import Quagga from 'quagga'; // ES6
((navigator, window, document, $) => {
    const checkUserMedia = () => {
        return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    }
    const initQRCode=()=>{
        QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';
        let scanner;
        const video = document.getElementById('qr-video');
        const camHasCamera = document.getElementById('cam-has-camera');
        const camQrResult = document.getElementById('cam-qr-result');
        const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
        const fileSelector = document.getElementById('file-selector');
        const fileQrResult = document.getElementById('file-qr-result');
       
        function setResult(label, result) {
            alert(result)
            label.textContent = result;
            camQrResultTimestamp.textContent = new Date().toString();
            label.style.color = 'teal';
            clearTimeout(label.highlightTimeout);
            label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
        }
    
        const initQRCodeScanner = () => {
            // ####### Web Cam Scanning #######
    
            if (checkUserMedia()) {
                QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);
    
                scanner = new QrScanner(video, result => setResult(camQrResult, result));
                scanner.start();
    
                document.getElementById('inversion-mode-select').addEventListener('change', event => {
                    scanner.setInversionMode(event.target.value);
                });
    
            } else {
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
        }
        $('#qr-code-scanner-modal').on('hidden.bs.modal', function (e) {
            console.log('close')
            scanner.destroy();
            scanner = null;
    
        })
        $('#qr-code-scanner-modal').on('show.bs.modal', function (e) {
            console.log('show')
            initQRCodeScanner();
        })
    }
    initQRCode();



    Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#bar-code')    // Or '#yourElement' (optional)
        },
        decoder : {
          readers : ["code_128_reader"]
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
      });
      Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
            alert(code)
        // if (App.lastResult !== code) {
        //     App.lastResult = code;
        //     var $node = null, canvas = Quagga.canvas.dom.image;

        //     $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        //     $node.find("img").attr("src", canvas.toDataURL());
        //     $node.find("h4.code").html(code);
        //     $("#result_strip ul.thumbnails").prepend($node);
        // }
    });
})(navigator, window, document, $)
