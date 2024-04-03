const readlineSync = require("readline-sync");

async function mostrarMenu() {
  console.clear();
  console.log("=== Aplicación de Lista de Tareas ===");
  console.log("\nSeleccione una opción:\n");
  console.log("1. Mostrar tareas");
  console.log("2. Agregar tarea");
  console.log("3. Actualizar tarea");
  console.log("4. Borrar tarea");
  console.log("5. Salir\n");

  return readlineSync.question("Opción: ");
}

async function esperarEnter() {
  return readlineSync.question("\nPulse Enter para continuar");
}

module.exports = { mostrarMenu, esperarEnter };
