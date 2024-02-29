const formulario = document.getElementById("formulario");
const txtListaTareas = document.getElementById("txtListaTareas");
const lblIdTarea = document.getElementById("lblIdTarea");
txtTareaTitulo.focus()

let arrListaTareas = [];

renderizarTareas(); // * Nada más abrir el navegador se renderizan las tareas.

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!txtTareaTitulo.value) {
    alert('El campo "Tarea" no puede estar vacío');
    txtTareaTitulo.focus()
  } else {
    guardarTarea();
  }
});

// * Renderiza en el DOM el contenido del array de tareas:
function renderizarTareas() {
  txtListaTareas.innerHTML = "";

  arrListaTareas = JSON.parse(localStorage.getItem("arrListaTareas")) || [];
  if (arrListaTareas.length === 0) {
    txtListaTareas.innerHTML =
      "<p class='text-bs-danger text-center'>No existen tareas</p>";
    return;
  }
  for (let i = 0; i < arrListaTareas.length; i++) {
    txtListaTareas.innerHTML += `
        <div class="p-2 mb-3 border-2 border-bs-info rounded-lg">
            <div class="flex mb-4 gap-2">
                <span class="text-bs-danger" id="tarea-id">${i}. </span>
                <p class="text-bs-warning" id="tarea-titulo">${arrListaTareas[i].tareaTitulo}: </p>
                <p id="tarea-descripcion">${arrListaTareas[i].tareaDescripcion}</p>
            </div>
            <button class="btn btn-danger" onclick="borrarTarea(${i})">Borrar</button>
            <button class="btn btn-warning" onclick="editarTarea(${i})">Editar</button>
        </div>
      `;
  }
}

function guardarTarea() {
  // * Si lblIdTarea está vacío se guarda la tarea y si no se edita la tarea:
  if (lblIdTarea.innerText) {
    const IdTarea = lblIdTarea.innerText;
    arrListaTareas[IdTarea].tareaTitulo = txtTareaTitulo.value;
    arrListaTareas[IdTarea].tareaDescripcion = txtTareaDescripcion.value;
  } else {
    arrListaTareas.push({
      tareaTitulo: txtTareaTitulo.value,
      tareaDescripcion: txtTareaDescripcion.value,
    });
  }

  // * Reinicia los campos después de guardar la tarea
  reiniciarCampos();

  localStorage.clear();
  localStorage.setItem("arrListaTareas", JSON.stringify(arrListaTareas));

  renderizarTareas();
}

function borrarTarea(idTarea) {
  arrListaTareas.splice(idTarea, 1);
  localStorage.clear();
  if (arrListaTareas.length > 0) {
    localStorage.setItem("arrListaTareas", JSON.stringify(arrListaTareas));
  }

  reiniciarCampos();
  renderizarTareas();
}

function editarTarea(idTarea) {
  txtTareaTitulo.value = arrListaTareas[idTarea].tareaTitulo;
  txtTareaDescripcion.value = arrListaTareas[idTarea].tareaDescripcion;
  lblIdTarea.innerText = idTarea;
  renderizarTareas();
}

function reiniciarCampos() {
  txtTareaTitulo.value = null;
  txtTareaDescripcion.value = null;
  lblIdTarea.innerText = null;
  txtTareaTitulo.focus()
}
