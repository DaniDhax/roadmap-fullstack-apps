# Renombrar Archivos

Este script de Node.js permite renombrar archivos en un directorio especificado y copiarlos a otro directorio con nombres nuevos.

## Requisitos
- Node.js instalado en el sistema.
- Acceso de escritura a los directorios especificados.

## Uso
1. Ejecute el script `app.js` utilizando Node.js.
2. Siga las instrucciones que aparecen en la consola para proporcionar los directorios de origen y destino.
3. El script copiará los archivos del directorio de origen al directorio de destino con nombres nuevos.

## Ejemplo de Uso

```bash
node app.js
```


## Funcionamiento
1. El script solicita al usuario el directorio donde se encuentran los archivos a renombrar y el directorio donde se copiarán los archivos renombrados.
2. Verifica si el directorio de destino existe. Si no existe, lo crea.
3. Lee los archivos en el directorio de origen.
4. Para cada archivo, copia el archivo al directorio de destino con un nombre nuevo en el formato archivo_#.txt, donde # es un número incremental.
5. Muestra mensajes de estado y errores en la consola.

## Notas
- Los nombres de los archivos copiados seguirán el formato archivo_#.txt, donde # es un número incremental.
- Si el archivo destino ya existe, será reemplazado.


