const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

// Función para solicitar al usuario el nombre del directorio
function preguntarDirectorio(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

async function renombrarArchivos() {
  const directorioOrigen = await preguntarDirectorio('Directorio donde se encuentran los archivos a renombrar: ');
  const directorioDestino = await preguntarDirectorio('Directorio donde se copiarán los archivos renombrados: ');

  // Verificar si el directorio de destino existe, si no existe, crearlo
  if (!fs.existsSync(directorioDestino)) {
    fs.mkdirSync(directorioDestino, { recursive: true });
    console.log(`El directorio ${directorioDestino} ha sido creado.`);
  }

  fs.readdir(directorioOrigen, (err, archivos) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return;
    }

    archivos.forEach((archivo, index) => {
      const rutaActual = path.join(directorioOrigen, archivo);
      const nuevaRuta = path.join(directorioDestino, `archivo_${index + 1}.txt`);

      fs.copyFile(rutaActual, nuevaRuta, (err) => {
        if (err) {
          console.error(`Error al copiar el archivo ${archivo}:`, err);
        } else {
          console.log(`Archivo ${archivo} copiado correctamente a ${nuevaRuta}`);
        }
      });
    });
  });

  rl.close();
}

renombrarArchivos();
