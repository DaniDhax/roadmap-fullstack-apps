const { showTasks, addTask, deleteTask, updateTask } = require("../modelos/modelo.js");

let exito = false

async function manejarSolicitud({ opcion, idTarea = null, nombreTarea = null }) {
  switch (opcion) {
    case "recuperarTodas":
      try {
        const tasks = await showTasks();
        return tasks;
      } catch (error) {
        console.error("Error al mostrar las tareas:", error.message);
        return null;
      }

    case "agregarTarea":
      try {
        const idTarea = await addTask(nombreTarea);
        return idTarea;
      } catch (error) {
        return null;
      }

    case "eliminarTarea":
      try {
        exito = await deleteTask(idTarea);
        if (!exito) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }

    case "actualizarTarea":
      try {
        exito = await updateTask(idTarea, nombreTarea);
        if (!exito) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }
  }
}

module.exports = { manejarSolicitud };
