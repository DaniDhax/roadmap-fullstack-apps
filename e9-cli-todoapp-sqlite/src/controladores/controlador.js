const readlineSync = require("readline-sync");

const { showTasks, addTask, deleteTask, updateTask } = require("./modelo");

async function main() {
  let exit = false;

  while (!exit) {
    const option = await mostrarMenu();

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
      await esperarEnter();
    }
  }
}

main()
