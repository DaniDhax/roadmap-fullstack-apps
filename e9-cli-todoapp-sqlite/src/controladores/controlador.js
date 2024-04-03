const readlineSync = require("readline-sync");
const { showTasks, addTask, deleteTask, updateTask } = require("../modelos/modelo.js");
const { cambiarPaginaDeCodigos, mostrarMenu, esperarEnter } = require("../vistas/vista.js");

cambiarPaginaDeCodigos()

async function main() {
  let exit = false;

  while (!exit) {
    const opcion = mostrarMenu()
      switch (opcion) {
        case "1":
          console.log('-----------------------------------------------------');
          console.log("Tareas:"); 
          try {
            const tasks = await showTasks();
            tasks.forEach(task => {
              console.log(`${task.id}: ${task.task}`);
            });
          } catch (error) {
            console.error("Error al mostrar las tareas:", error.message);
          }
          break;
        case "2":
          const newTask = readlineSync.question("Ingrese la nueva tarea: ");
          try {
            await addTask(newTask);
            console.log("Tarea agregada correctamente");
          } catch (error) {
            console.error("Error al agregar la tarea:", error.message);
          }
          break;
        case "3":
          const taskId = readlineSync.question("Ingrese el ID de la tarea a actualizar: ");
          const updatedTask = readlineSync.question("Ingrese la tarea actualizada: ");
          try {
            await updateTask(taskId, updatedTask);
            console.log("Tarea actualizada correctamente");
          } catch (error) {
            console.error("Error al actualizar la tarea:", error.message);
          }
          break;
        case "4":
          const taskToDelete = readlineSync.question("Ingrese el ID de la tarea a borrar: ");
          try {
            await deleteTask(taskToDelete);
            console.log("Tarea eliminada correctamente");
          } catch (error) {
            console.error("Error al eliminar la tarea:", error.message);
          }
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

main();
