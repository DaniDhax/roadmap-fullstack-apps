const readlineSync = require("readline-sync");
const { execSync } = require('child_process');

function cambiarPaginaDeCodigos() {
  try {
    execSync('chcp.com 65001');
    console.log('Página de códigos cambiada a UTF-8 (65001).');
  } catch (error) {
    console.error('Error al cambiar la página de códigos:', error);
  }
}

function mostrarMenu() {
  console.clear();
  console.log("=== Aplicación de Lista de Tareas ===");
  console.log("\nSeleccione una opción:\n");
  console.log("1. Mostrar tareas");
  console.log("2. Agregar tarea");
  console.log("3. Actualizar tarea");
  console.log("4. Borrar tarea");
  console.log("5. Salir\n");

  const opcion =  readlineSync.question("Opción: ");
  return (opcion);
}

async function esperarEnter() {
  return readlineSync.question("\nPulse Enter para continuar");
}

module.exports = { cambiarPaginaDeCodigos, mostrarMenu, esperarEnter };
