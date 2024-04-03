const sqlite3 = require("sqlite3").verbose();

let db = null;

// Función para conectar a la base de datos
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

// Función para cerrar la conexión con la base de datos
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

// Función para mostrar las tareas
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

// Función para agregar una nueva tarea
async function addTask(task) {
  try {
    await conectarDB();
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO tasks (task) VALUES (?)", [task], function (err) {
        if (err) {
          console.error("Error al añadir la tarea:", err.message);
          reject(err);
        } else {
          console.log(`Nueva tarea añadida con ID ${this.lastID}`);
          resolve();
        }
      });
    });
  } finally {
    await cerrarConexion();
  }
}

// Función para borrar una tarea
async function deleteTask(id) {
  try {
    await conectarDB();
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) {
          console.error("Error al eliminar la tarea:", err.message);
          reject(err);
        } else {
          console.log(`Tarea con ID ${id} eliminada`);
          resolve();
        }
      });
    });
  } finally {
    await cerrarConexion();
  }
}

// Función para actualizar una tarea
async function updateTask(id, newTask) {
  try {
    await conectarDB();
    return new Promise((resolve, reject) => {
      db.run("UPDATE tasks SET task = ? WHERE id = ?", [newTask, id], function (err) {
        if (err) {
          console.error("Error al actualizar la tarea:", err.message);
          reject(err);
        } else {
          console.log(`Tarea con ID ${id} actualizada`);
          resolve();
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
