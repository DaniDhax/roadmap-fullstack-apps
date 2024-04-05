const readlineSync = require("readline-sync");
const { execSync } = require("child_process");
const { manejarSolicitud } = require("../controladores/controlador");

function cambiarPaginaDeCodigos() {
  try {
    execSync("chcp.com 65001");
    console.log("Página de códigos cambiada a UTF-8 (65001).");
  } catch (error) {
    console.error("Error al cambiar la página de códigos:", error);
  }
}

cambiarPaginaDeCodigos();

async function mostrarTodas() {
  const tasks = await manejarSolicitud({ opcion: "recuperarTodas" });
  if (!tasks) {
    console.log("Error al recuperar las tareas");
    process.exit(0);
  }

  console.log("\n-----------------------------------------------------");
  console.log("ID    Tareas:");
  console.log("-----------------------------------------------------");

  tasks.forEach((task) => {
    console.log(`${task.id}.    ${task.task}`);
  });
}

async function mostrarMenu() {
  let exit = false;

  while (!exit) {
    console.clear();
    console.log("=== Aplicación de Lista de Tareas ===");
    console.log("\nSeleccione una opción:\n");
    console.log("1. Mostrar tareas");
    console.log("2. Agregar tarea");
    console.log("3. Borrar tarea");
    console.log("4. Actualizar tarea");
    console.log("5. Salir\n");

    const opcion = readlineSync.question("Opción: ");
    let resultado = false;

    switch (opcion) {
      // * Mostrar todas las tareas:
      case "1":
        await mostrarTodas();
        break;

      // * Añadir tarea:
      case "2":
        const nombreTarea = readlineSync.question("Ingrese la nueva tarea: ");
        const idTareaNueva = await manejarSolicitud({ opcion: "agregarTarea", nombreTarea: nombreTarea });
        if (!idTareaNueva) {
          console.log("Error al añadir la tarea");
          process.exit(0);
        }
        console.log(`Nueva tarea añadida con ID ${idTareaNueva}`);
        break;

      // * Eliminar una tarea:
      case "3":
        // * Mostrar las tareas al usuario:
        await mostrarTodas();

        // * Preguntar cual de ellas quiere eliminar:
        const idTaskToDelete = parseInt(readlineSync.question("\nIngrese el ID de la tarea a eliminar: "));
        resultado = await manejarSolicitud({ opcion: "eliminarTarea", idTarea: idTaskToDelete });
        if (!resultado) {
          console.error(`Error al eliminar la tarea ${idTaskToDelete}.`);
        } else {
          console.log(`Tarea con ID ${idTaskToDelete} eliminada con éxito.`);
        }

        break;

      // * Actualizar tarea:
      case "4":
        // * Mostrar las tareas al usuario:
        await mostrarTodas();

        // * Preguntar la tarea a actualizar:
        const idTaskToUpdate = readlineSync.question("\nIngrese el ID de la tarea a actualizar: ");
        const updatedTask = readlineSync.question("Ingrese la tarea actualizada: ");
        resultado = await manejarSolicitud({ opcion: "actualizarTarea", idTarea: idTaskToUpdate, nombreTarea: updatedTask });
        if (!resultado) {
          console.error(`Error al actualizar la tarea ${idTaskToUpdate}.`);
        } else {
          console.log(`Tarea con ID ${idTaskToUpdate} actualizada con éxito.`);
        }
        break;

      // * Salir:
      case "5":
        console.log("Saliendo...");
        exit = true;
        break;

      default:
        console.log("Opción no válida.\n");
    }

    if (!exit) {
      readlineSync.question("\nPulse Enter para continuar...");
    }
  }
}

mostrarMenu();

module.exports = { cambiarPaginaDeCodigos, mostrarMenu };
