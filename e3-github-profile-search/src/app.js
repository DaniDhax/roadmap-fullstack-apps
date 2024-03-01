const txtUsuario = document.getElementById("txtUsuario");
const btnBuscar = document.getElementById("btnBuscar");
const contenedorDatos = document.getElementById("contenedorDatos");

btnBuscar.addEventListener("click", traerDatos);

async function traerDatos() {
  if (!txtUsuario.value) {
    return;
  }
  contenedorDatos.innerHTML = "Introduzca un nombre de perfil";

  try {
    const respuesta = await fetch("https://api.github.com/users/" + txtUsuario.value);

    if (respuesta.status == 200) {
      const perfil = await respuesta.json();
      renderizarDatos(perfil);
    } else if (respuesta.status == 404) {
      contenedorDatos.innerHTML = "No se ha encontrado ningún perfil con ese nombre";
    } else {
      contenedorDatos.innerHTML = "Ha surgido un error en la petición de datos";
    }
  } catch (e) {
    console.log(e);
    contenedorDatos.innerHTML = "Ha surgido un error en la petición de datos";
  }
}

function renderizarDatos(perfil) {
  contenedorDatos.innerHTML = `<div class="h-40 w-40 bg-cover bg-no-repeat bg-center rounded-full self-center" style="background-image: url(${perfil.avatar_url});"></div>
  <p>Login: <span class="text-white">${perfil.login}</span> </p>
  <p>Nombre: <span class="text-white">${perfil.name || "No hay datos"}</span></p>
  <p>Empresa: <span class="text-white">${perfil.company || "No hay datos"}</span></p>
  <p>Blog: <span class="text-white">${perfil.blog || "No hay datos"}</span></p>
  <p>Localización: <span class="text-white">${perfil.location || "No hay datos"}</span></p>
  <p>Bio: <span class="text-white">${perfil.bio || "No hay datos"}</span></p>
  <p>Nombre en Twitter: <span class="text-white">${perfil.twitter_username || "No hay datos"}</span></p>
  <p>Repos públicos: <span class="text-white">${perfil.public_repos}</span></p>
  <p>Followers: <span class="text-white">${perfil.followers}</span></p>`;
}
