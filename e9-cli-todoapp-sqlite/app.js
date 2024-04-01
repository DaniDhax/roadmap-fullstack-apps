const readlineSync = require("readline-sync");
const fs = require("fs");

const { showTasks, addTask, deleteTask, updateTask} = require('./main')

// console.clear();

// * Verificar si el archivo de la base de datos existe:
if (!fs.existsSync("tasks.db")) {
  readlineSync.question(`La base de datos '${"tasks.db"}' no existe. (pulse Enter para terminar).`);
  process.exit(1); // * Salir del proceso con código de error
} else {
    main()
}

async function main() {
  console.log("=== Aplicación de Lista de Tareas ===");

  // * mantener la aplicación en funcionamiento continuo hasta que el usuario decida salir explícitamente seleccionando la opción "Salir":
  while (true) {
    console.log("\nSeleccione una opción:\n");
    console.log("1. Mostrar tareas");
    console.log("2. Agregar tarea");
    console.log("3. Actualizar tarea");
    console.log("4. Borrar tarea");
    console.log("5. Salir\n");

    const option = readlineSync.question("Opción: ");

    switch (option) {
      case "1":
        console.log("\nTareas:"); // * El carácter de escape '\n' en la cadena de texto representa un salto de línea.
        await showTasks();
        break;
      case "2":
        const newTask = readlineSync.question("Ingrese la nueva tarea: ");
        await addTask(newTask);
        break;
      case "3":
        const taskId = readlineSync.question("Ingrese el ID de la tarea a actualizar: ");
        const updatedTask = readlineSync.question("Ingrese la tarea actualizada: ");
        await updateTask(taskId, updatedTask);
        break;
      case "4":
        const taskToDelete = readlineSync.question("Ingrese el ID de la tarea a borrar: ");
        await deleteTask(taskToDelete);
        break;
      case "5":
        console.log("Saliendo...");
        process.exit(0);
      default:
        console.log("Opción no válida.\n");
    }
    readlineSync.question('Pulse Enter para continuar')
  }
}


