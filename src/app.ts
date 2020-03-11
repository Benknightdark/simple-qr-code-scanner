import { Barcode, BarcodePicker, ScanSettings, configure } from "scandit-sdk";
//AcN+3ibIOL7AKEDqdCpZkFZAlsxfPT8wR3GK1G983jmMTvXTkCm74PRvNPzVc6lJdAJk7YB7yWUYETmlQVIP/Yx9DXQEQZN3jXPE+bBxqiNiKVIUwQlhz5QE5GuYUIydihWqgF1TmeE5IkzzaE/rtlteH1f0GUzzyQSI4/jrosS2Bx97nn0AnVhYYLkdmUVHiXsmqgpADjbXFTMOtxSoMydBIk9aacGzaT7mvHdtITfMSrE/PhieVWowZ/c6siWnQzVD8ZV8hrGJAVT5JnHxXGwK5rpCnQ0jd/rtCkIA4SDznSqMqvio+/gTCTY7ZIYf6fZ2ygvYEyaB4oiBCNPm5buPYjQYC05PB31XBMZg734kSYuWa1TVGlrdIYV1iXe4Zmxc7ELdfENDBWT8qX6XeRpr1GkJBrT2GkEWkEi1ePtbBV5+f7eF5yO6Sh6LR26FbX4ZsNJacY0t73AYlAfQTxkV4c2HooFTo9oVxhkFR8Qvd3CtfR8urzeHu7W4C2vuKnTcy2e/YdytYNy6fNw+eI/PuukotW4Qc7t/iVsGReXlK6AVEBqXPIkcpKhbezun84Pkj+/4EBVlH2SPFfrldHe0NDFidJwI4xGqfBQiAJuZx7u1UNCjUxV36YzplEaPEjn8saGaNXfuF3k1Jz5rLtec48BWKBNAmzX18DWrDSWlnS+4SFn64NOlDUlvcw9bTwNH4+AoE8MU/Y67oidGq/vQa67j+c4vzgrzSQnTxeEwtMWeIqYTtFfJQoKmoAdtRixHWHtxWWG2BFPwH+Lvv7BPJ4ph3k3Oz3BC
configure("AaN+gTHIL16VN0WAqCMVWTsju2QaBoqi3FKh84tdihf/RsZj2CajnOhBqNh5EPt0Anlaf+5KCEj9RmOnzky183JVgITiQZNc7VDBUxx0YKNQfnNEJ1rqCu95prY6dw4tZku33YljWDWRUVCSyByRGhtGazlMB7w7xUV6u28CWngBlVxt+4W+Zp52plAhAZRN/IB86+yRb6t5Kb2VaS7aWcPipCKUQF/cPeNcjmU12LkGcyVmQvA8RPq6J9nZwTL4i1o19XsA8VrGepCUqJvD9FHhe9LB8yBcl/R+MV+CV1cwiqC2rwr8/Ds9TAiwvkw10Y9Bwg7wC10ne9le7HgOubJTiYEDiPWKtxxAvBPHuf4VIV/b3UtAMdIwMljHPL97KcumEL8Ky/dbGNaXjOVlhLaL3CHVrK5REBKGZ+CS00ZRFDIu2buouoBC0R/rqtqWfMogUdrjXQLfCuuVW95pX739/T6yK7rIIpTcqdIkg49L/E01aCthvqST18vXjbqdd7/UuPsu/jIBVoCsnKz1fH9AZCCM99cdUk/aakNp3TrIqYT3OVBqOArxKdzOhc2nhh9PWO1MOvr9uQt9b144x2xbWJwzFJw7XJlGiQn7RSwDN8ttt6iAKMwfXjwpiFnFdE/pTG1/R3KaFXnMGpG5h7RLcah8oe1ksTnWP0Say8m5TXPBKny5I7FtFBMhccgLRuVQuRW8XRSyG2nAaQw64HrT8K7WMkDhjtC3aYxH2Ne1JioASLZ4t8CBXQax+TvmwLKuwgN5k5tktzrWrG41yxa34Teq9ddjgLA3CkXX3ie3HxAjDwvsbrOHOoFvYSHURsrG1yo/g15b", {
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@4.x/build"
});

BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
    playSoundOnScan: true,
    vibrateOnScan: true
}).then((barcodePicker) => {
    console.log(barcodePicker)
//    let picker = barcodePicker;
//     // Create the settings object to be applied to the scanner
//     const scanSettings = new ScanSettings({
//         enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93",
//             "itf"
//         ],
//         codeDuplicateFilter: 1000
//     });
//     picker.applyScanSettings(scanSettings);

//     // If a barcode is scanned, show it to the user and pause scanning
//     // (scanning is resumed when the user clicks "Continue Scanning")
barcodePicker.on("scan", scanResult => {

    barcodePicker.pauseScanning();
     let bb = scanResult.barcodes.reduce((string, barcode) =>
            string +
            `${Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}<br>`,
            '');
            alert(bb)
    });
    barcodePicker.on("scanError", error => {
        alert(error.message);
    });
//     picker.resumeScanning();
    // barcodePicker is ready here to be used (rest of the tutorial code should go here)
});