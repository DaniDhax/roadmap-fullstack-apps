const sqlite3 = require("sqlite3").verbose();

let db = null

process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err);
  // Aquí puedes realizar acciones como loggear el error, notificar a los usuarios, etc.
  // Pero ten en cuenta que el estado del proceso podría ser inestable.
});


// * Conexión a la base de datos SQLite (se utliza el parámetro 'sqlite3.OPEN_READONLY' para que no cree un archivo 'tasks.db' en caso de que no exista)
function conectarDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database("tasks.db", sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
        db = null
        resolve(null)
        // reject(err);  // * Si rechazamos la promesa el proceso se termina.
      } else {
        // console.log("Conexión exitosa a la base de datos.");
        resolve(db);
      }
    });
  });
}


// * Función para cerrar la conexión con la base de datos
function cerrarConexion() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error al cerrar la conexión con la base de datos:', err.message);
          reject(err);
        } else {
          // console.log('Conexión cerrada con la base de datos.');
          resolve(); // Resuelve la promesa después de cerrar la conexión
        }
      });
    } else {
      console.log('No se encontró la conexión a la base de datos.');
      resolve(); // Resuelve la promesa si no se encontró la conexión
    }
  });
}

// * Función para mostrar las tareas
async function showTasks() {

    await conectarDB();

    if (!db) { return }

    return new Promise((resolve, reject) => {
      db.each("SELECT * FROM tasks", (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err); // Si hay un error, rechaza la promesa
        } else {
          console.log(`${row.id}: ${row.task}`);
        }
      }, async () => {
        // * Después de mostrar todas las tareas, resolver la promesa y cerrar la conexión a la base de datos
        resolve(await cerrarConexion())
      });
    });
}


// * Función para agregar una nueva tarea
async function addTask(task) {

  await conectarDB();

  if (!db) { return }


  return new Promise ((resolve, reject) => {
    
    db.run("INSERT INTO tasks (task) VALUES (?)", [task], function (err) {
      if (err) {
        return console.error("Error al añadir la tarea: " + err.message);
      } else {
        console.log(`Nueva tarea añadida con ID ${this.lastID}`);
      }
      resolve()
    });
  })

}

// * Función para borrar una tarea
async function deleteTask(id) {
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Tarea con ID ${id} eliminada`);
  });
}

// * Función para actualizar una tarea
async function updateTask(id, newTask) {
  db.run("UPDATE tasks SET task = ? WHERE id = ?", [newTask, id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Tarea con ID ${id} actualizada`);
  });
}

module.exports = {
  showTasks,
  addTask,
  updateTask,
  deleteTask,
};
