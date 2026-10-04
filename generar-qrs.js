const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const API = "https://script.google.com/macros/s/AKfycbyrEf8dEH4CJNdJWmvHkOhkEIt_XSsGEV3_d8q4LGmPWxji2MTq_up6tljZ1KbYX_97/exec";

const carpetaSalida = path.join(__dirname, "QR-PNG");

if (!fs.existsSync(carpetaSalida)) {
    fs.mkdirSync(carpetaSalida);
}

async function prueba() {

    const id = "003";

    const url = API + "?id=" + id;

    await QRCode.toFile(
        path.join(carpetaSalida, "PRUEBA-003.png"),
        url,
        {
            width: 1000,
            margin: 4
        }
    );

    console.log("QR de prueba creado:");
    console.log(url);
}

prueba();