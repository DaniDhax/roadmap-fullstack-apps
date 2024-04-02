const readlineSync = require("readline-sync");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("tasks.db", (err) => {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
  });
});

function showTasks() {
  return new Promise(() => {
    db.each("SELECT * FROM tasks", (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`${row.id}: ${row.task}`);
    });
  });
}

async function main() {
  console.log("=== Aplicación de Lista de Tareas ===");
  console.log("\nSeleccione una opción:\n");
  console.log("1. Mostrar tareas");
  console.log("5. Salir\n");

  const option = readlineSync.question("Opción: ");

  switch (option) {
    case "1":
      console.log("\nTareas:"); // * El carácter de escape '\n' en la cadena de texto representa un salto de línea.
      await showTasks();
      break;
    case "5":
      console.log("Saliendo...");
      process.exit(0);
    default:
      console.log("Opción no válida.\n");
  }
  readlineSync.question("\nPulse Enter para continuar");
  main();
}

main();
