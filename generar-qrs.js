const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const usuario = "dracoci27";
const repositorio = "QR-Dinamicos";

const carpetaSalida = path.join(__dirname, "QR-PNG");

if (!fs.existsSync(carpetaSalida)) {
    fs.mkdirSync(carpetaSalida);
}

async function generarQRs() {

    for (let numero = 1; numero <= 100; numero++) {

        const id = String(numero).padStart(3, "0");

        const url =
            `https://${usuario}.github.io/${repositorio}/${id}/`;

        const archivo =
            path.join(carpetaSalida, `${id}.png`);

        await QRCode.toFile(archivo, url, {
            width: 1000,
            margin: 4
        });

        console.log(`QR ${id} creado → ${url}`);
    }

    console.log("\n✅ Los 100 QR fueron creados.");
}

generarQRs();