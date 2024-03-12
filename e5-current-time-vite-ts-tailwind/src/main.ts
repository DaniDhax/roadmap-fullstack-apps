import './style.css'
import dayjs from 'dayjs'
import MicroModal from 'micromodal';

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

MicroModal.init();

// ! Con la API nativa del navegador:
//console.log(Date.now()) // * Devuelve: 1710234836379 (o la cadena correspondiente a la fecha en la que se ejecute este código).
//console.log(new Date()) // * Devuelve: Tue Mar 12 2024 10:49:45 GMT+0100 (hora estándar de Europa central)
// var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


// ! Con dayjs:
// console.log(dayjs()) // * Devuelve un objeto con propiedades como D, H, m, s, etc.
// console.log(JSON.stringify(dayjs())) // * Devuelve: "2024-03-12T10:24:20.642Z"

// console.log(dayjs(Date.now()).format('DD/MM/YYYY')) // * Devuelve: 12/03/2024
// console.log(dayjs(new Date()).format('DD/MM/YYYY')) // * Devuelve: 12/03/2024

// console.log(dayjs.tz.guess()); // * Devuelve: Europe/Madrid
// console.log(dayjs(Date.now()).format('hh:mm:ss'))
// console.log(dayjs(Date.now()).format('dddd, D MMM, YYYY'))



const txtContenedor = document.getElementById('txtContenedor')

// Event listener for opening the modal
document.getElementById('openModalButton')?.addEventListener('click', () => {
    MicroModal.show('timezoneModal');
  });


function render() {
    if (!txtContenedor) { return }

    let zona = dayjs.tz.guess()
    let hora = dayjs(Date.now()).format('HH:mm:ss')
    let dia = dayjs(Date.now()).format('dddd, D MMM, YYYY')

    txtContenedor.innerHTML = `
        <p class="font-lateef text-red-600 text-xs text-right">${zona}</p>
        <p class="font-oleo-script text-3xl text-right pr-2">${hora}</p>
        <p class="font-lateef text-xs text-right">${dia}</p>
        `

    setTimeout(render, 1000);

}

render()






