const readlineSync = require("readline-sync");
const { showTasks, addTask, deleteTask, updateTask } = require("../modelos/modelo.js");

async function manejarSolicitud({ opcion, idTarea = null, nombreTarea = null }) {

  switch (opcion) {

    case "recuperarTodas":
      try {
        const tasks = await showTasks();
        return (tasks)
      } catch (error) {
        console.error("Error al mostrar las tareas:", error.message);
        return (null)
      }

    case "agregarTarea":
      try {
        const idTarea = await addTask(nombreTarea);
        return(idTarea)
      } catch (error) {
        return(null)
      }

    case "actualizarTarea":
      const taskId = readlineSync.question("Ingrese el ID de la tarea a actualizar: ");
      const updatedTask = readlineSync.question("Ingrese la tarea actualizada: ");
      try {
        await updateTask(taskId, updatedTask);
        console.log("Tarea actualizada correctamente");
      } catch (error) {
        console.error("Error al actualizar la tarea:", error.message);
      }
      
    case "eliminarTarea":
      
      try {
        await deleteTask(idTarea);
        return("Exito");
      } catch (error) {
        return(null)
      }
    }
}

module.exports = { manejarSolicitud };
