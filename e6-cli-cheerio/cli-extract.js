import { createInterface } from "readline";
import axios from "axios";
import * as cheerio from "cheerio";

const rl = createInterface(process.stdin, process.stdout);


// const fetch = require('node-fetch');

async function fetchData() {
  const proxyUrl = 'http://proxy1:8080'; // Reemplaza con la URL de tu proxy

  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    agent: new URL(proxyUrl),
  });

  const data = await response.json();
  console.log(data);
}

fetchData();


// rl.question("Introduce una url (ej. 'https://www.danidhax.xyz'): ", async function (url) {
//   rl.question("Introduce una etiqueta HTML (ej. 'h1'): ", async function (tag) {
//     extractText(url, tag);
//     rl.close();
//   });
// });

async function extractText(url, tag) {
  try {
    const response = await axios.get(url);
  } catch (error) {
    console.error (error)
  }
  // const datos = cheerio.load(response.data);
  console.log (url, tag)
  // console.log(datos(tag).prop("innerText"));
}

