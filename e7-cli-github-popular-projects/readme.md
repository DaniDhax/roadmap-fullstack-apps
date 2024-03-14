# Aplicación CLI de búsqueda de los proyectos con más estrellas en GitHub, dentro de un rango de fechas.

Esta es una aplicación de línea de comandos (CLI) que permite buscar los proyectos más estrellados en GitHub dentro de un rango de fechas especificado por el usuario.

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener Node.js instalado en tu sistema.

## Instalación

1. Clona este repositorio en tu máquina local.

```bash
git clone <url-del-repositorio>
```

2. Navega al directorio de la aplicación.

```bash
cd <nombre-del-directorio>
```

3. Instala las dependencias.

```bash
npm install
```

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando en tu terminal:

```bash
npm run dev
```

La aplicación te pedirá que ingreses la fecha de inicio y la fecha de fin en formato `yyyy-mm-dd`. Si no proporcionas la fecha de fin, se utilizará la fecha actual.

Una vez ingresadas las fechas, la aplicación buscará los proyectos con más estrellas en GitHub dentro del rango de fechas especificado y mostrará los resultados en la consola, ordenados de más a menos estrellas.

## Ejemplo

```
Fecha inicio (yyyy-mm-dd): 2022-01-01
Fecha fin (yyyy-mm-dd, dejar vacío para usar la fecha de hoy):
```

## Funcionalidades Adicionales

- Si no se encuentran proyectos dentro del rango de fechas especificado, la aplicación mostrará un mensaje indicando que no se encontraron proyectos.
- La aplicación maneja errores de manera adecuada y mostrará un mensaje si se produce un error al buscar los datos de la API de GitHub.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
