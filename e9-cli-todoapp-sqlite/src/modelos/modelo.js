const sqlite3 = require("sqlite3").verbose();

let db = null;

// * Conectar con la base de datos
function conectarDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database("tasks.db", sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
        reject(err);
      } else {
        // console.log("Conexión exitosa a la base de datos.");
        resolve(db);
      }
    });
  });
}

// * Cerrar la conexión con la base de datos
function cerrarConexion() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error al cerrar la conexión con la base de datos:', err.message);
          reject(err);
        } else {
          // console.log('Conexión cerrada con la base de datos.');
          resolve();
        }
      });
    } else {
      console.log('No se encontró la conexión a la base de datos.');
      resolve();
    }
  });
}

// * Mostrar todas las tareas
async function showTasks() {
  try {
    await conectarDB();
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM tasks", (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } finally {
    await cerrarConexion();
  }
}

// * Agregar una nueva tarea
async function addTask(task) {
  try {
    await conectarDB();
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO tasks (task) VALUES (?)", [task], function (err) {
        if (err) {
          console.error("Error al añadir la tarea:", err.message);
          reject(err);
        } else {
          resolve(this.lastID); // * 'this' se refiere al OBJETO de nombre 'Statement' devuelto por 'db.run()', que representa la consulta ejecutada en la base de datos. Este objeto tiene la propiedad 'lastID'. 
        }
      });
    });
  } finally {
    await cerrarConexion();
  }
}

// * Borrar una tarea:
async function deleteTask(id) {
  try {
    await conectarDB();

    // * Comprobar si la tarea existe:
    const taskExists = await new Promise((resolve, reject) => {
      db.get("SELECT id FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.error("Error al verificar la existencia de la tarea:", err.message);
          reject(err);
        } else {
          if (!row) {
            resolve(null)
          }
          resolve(!!row); // * Retorna true si la tarea existe, false si no existe
        }
      });
    });

    if (!taskExists) {
      console.error("La tarea con el ID proporcionado no existe.");
      return (false); // Termina la función sin intentar eliminar la tarea inexistente
    } 

    return new Promise((resolve, reject) => {
      db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) {
          console.error("Error al eliminar la tarea:", err.message);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  } finally {
    await cerrarConexion();
  }
}

// * Actualizar una tarea
async function updateTask(id, newTask) {
  try {
    await conectarDB();

    // * Comprobar si la tarea existe:
    const taskExists = await new Promise((resolve, reject) => {
      db.get("SELECT id FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.error("Error al verificar la existencia de la tarea:", err.message);
          reject(err);
        } else {
          if (!row) {
            resolve(null)
          }
          resolve(!!row); // * Retorna true si la tarea existe, false si no existe
        }
      });
    });

    if (!taskExists) {
      console.error("La tarea con el ID proporcionado no existe.");
      return (false); // Termina la función sin intentar eliminar la tarea inexistente
    } 


    return new Promise((resolve, reject) => {
      db.run("UPDATE tasks SET task = ? WHERE id = ?", [newTask, id], function (err) {
        if (err) {
          console.error("Error al actualizar la tarea:", err.message);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  } finally {
    await cerrarConexion();
  }
}

module.exports = {
  showTasks,
  addTask,
  deleteTask,
  updateTask,
};
