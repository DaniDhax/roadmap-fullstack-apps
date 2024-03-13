import { createInterface } from "readline";
import axios from "axios";
import * as cheerio from "cheerio";

const rl = createInterface(process.stdin, process.stdout);

rl.question("Introduce una url (ej. 'https://www.danidhax.xyz'): ", async function (url) {
  rl.question("Introduce una etiqueta HTML (ej. 'h1'): ", async function (tag) {
    extractText(url, tag);
    rl.close();
  });
});

async function extractText(url, tag) {
  const response = await axios.get(url);
  const datos = cheerio.load(response.data);
  console.log(datos(tag).prop("innerText"));
}



