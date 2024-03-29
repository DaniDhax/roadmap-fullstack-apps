const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Fecha inicio (yyyy-mm-dd): ", async (varFechaInicio) => {
  rl.question("Fecha fin (yyyy-mm-dd, dejar vacío para usar la fecha de hoy): ", async (varFechaFin) => {
    // * Si no se proporciona la fecha final, ésta se rellena con la fecha de hoy en formato yyyy-mm-dd
    if (!varFechaFin) {
      varFechaFin = new Date().toISOString().slice(0, 10);
    }
    try {
        const response = await axios.get(`https://api.github.com/search/repositories?q=created:${varFechaInicio}..${varFechaFin}&sort=stars&order=desc`);
        const projects = response.data.items;
        if (projects.length === 0) {
            console.log('No se han encontrado proyectos en ese rango de fechas.')
        } else {
            projects.slice(0, 10).forEach((project, index) => {
              console.log(`${index + 1}. ${project.name} - ${project.stargazers_count} stars  URL: ${project.html_url}`);
            });
        }

    } catch (error) {
        console.log('Se ha producido un error al buscar los datos de la API: ', error)
    }
    
    rl.close();
  });

});
