const readlineSync = require("readline-sync");

const { showTasks, addTask, deleteTask, updateTask } = require("./main");

async function main() {
  let exit = false;

  while (!exit) {
    console.clear()
    console.log("=== Aplicación de Lista de Tareas ===");
    console.log("\nSeleccione una opción:\n");
    console.log("1. Mostrar tareas");
    console.log("2. Agregar tarea");
    console.log("3. Actualizar tarea");
    console.log("4. Borrar tarea");
    console.log("5. Salir\n");

    const option = readlineSync.question("Opción: ");

    switch (option) {
      case "1":
        console.log('-----------------------------------------------------')
        console.log("Tareas:"); 
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
        exit = true;
        break;
      default:
        console.log("Opción no válida.\n");
    }

    if (!exit) {
      readlineSync.question("\nPulse Enter para continuar");
    }
  }
}

main()
