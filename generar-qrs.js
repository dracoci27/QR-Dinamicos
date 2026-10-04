const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const usuario = "dracoci27";
const repositorio = "QR-Dinamicos";

const API =
  "https://script.google.com/macros/s/AKfycbyrEf8dEH4CJNdJWmvHkOhkEIt_XSsGEV3_d8q4LGmPWxji2MTq_up6tljZ1KbYX_97/exec";

const carpetaQR = path.join(__dirname, "QR-PNG");

if (!fs.existsSync(carpetaQR)) {
  fs.mkdirSync(carpetaQR);
}

async function generar() {

  for (let numero = 1; numero <= 100; numero++) {

    const id = String(numero).padStart(3, "0");

    // Crear carpeta si no existe
    const carpetaID = path.join(__dirname, id);

    if (!fs.existsSync(carpetaID)) {
      fs.mkdirSync(carpetaID);
    }

    // Crear index.html
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

window.qrCallback = function(datos) {

  if (datos.destino) {
    window.location.replace(datos.destino);
  } else {
    document.body.innerHTML =
      "<h2>Este QR todavía no está configurado.</h2>";
  }

};

const script = document.createElement("script");

script.src =
  API +
  "?id=" +
  ID +
  "&callback=qrCallback&t=" +
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

    // URL que quedará IMPRESA en el QR
    const url =
      `https://${usuario}.github.io/${repositorio}/${id}/index.html`;

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
  console.log("================================");
  console.log("✅ 100 QR DEFINITIVOS CREADOS");
  console.log("================================");
}

generar();