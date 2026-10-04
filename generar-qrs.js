const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const usuario = "dracoci27";
const repositorio = "QR-Dinamicos";

const API =
  "https://script.google.com/macros/s/AKfycbyKuaUF06D0P78coVg9YQpQak2_7W9hQvNoseVpZfjqvst5wiDvhVHE3LbVfaO2RNcW/exec";

const carpetaQR = path.join(__dirname, "QR-PNG");

if (!fs.existsSync(carpetaQR)) {
  fs.mkdirSync(carpetaQR);
}

async function generar() {

  for (let numero = 1; numero <= 100; numero++) {

    const id = String(numero).padStart(3, "0");
    const carpetaID = path.join(__dirname, id);

    if (!fs.existsSync(carpetaID)) {
      fs.mkdirSync(carpetaID);
    }

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Redirigiendo...</title>
</head>

<body>

<p>Redirigiendo...</p>

<script>
const API = "${API}";
const ID = "${id}";

const script = document.createElement("script");

script.src =
  API +
  "?id=" +
  ID +
  "&modo=redirect&t=" +
  Date.now();

document.head.appendChild(script);
</script>

</body>
</html>`;

    fs.writeFileSync(
      path.join(carpetaID, "index.html"),
      html,
      "utf8"
    );

    const url =
      `https://${usuario}.github.io/${repositorio}/${id}/`;

    await QRCode.toFile(
      path.join(carpetaQR, `${id}.png`),
      url,
      {
        width: 1000,
        margin: 4
      }
    );

    console.log(`✅ ${id}`);
  }

  console.log("");
  console.log("====================================");
  console.log("✅ 100 QR DEFINITIVOS GENERADOS");
  console.log("====================================");
}

generar();