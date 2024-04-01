const readlineSync = require("readline-sync");
const sqlite3 = require("sqlite3").verbose();

// * Conexión a la base de datos SQLite:
  const db = new sqlite3.Database("tasks.db", (err) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err.message);
      process.exit(1);
    } else {
      console.log("Conexión exitosa con la base de datos.");

      // * Crear tabla si no existe.
      // * El método db.serialize() sirve para asegurarse de que las consultas se ejecutan en orden secuencial y no de manera simultanea, dado que SQLite es una base de datos de un solo hilo, pero podrían existir múltiples consultas en cola.
      db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
      });
    }
  });


// * Función para mostrar las tareas
async function showTasks() {
  db.each("SELECT * FROM tasks", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`${row.id}: ${row.task}`);
    process.exit(0)
  });
}

// * Función para agregar una nueva tarea
async function addTask(task) {
  db.run("INSERT INTO tasks (task) VALUES (?)", [task], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Nueva tarea añadida con ID ${this.lastID}`);
  });
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
