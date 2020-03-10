import $ from 'jquery';
import QRScanner from 'qr-code-scanner';
$('#open').click(()=>{
    QRScanner.initiate({
        className:"picker",
        // match: /^[a-zA-Z0-9]{16,18}$/, // optional
        onResult: function (result) { console.info('DONE: ', result); },
        onError: function (err) { console.error('ERR :::: ', err); }, // optional
        onTimeout: function () { console.warn('TIMEOUT'); } // optional
    })
})
