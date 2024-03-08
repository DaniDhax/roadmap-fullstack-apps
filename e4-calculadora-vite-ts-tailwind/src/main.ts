import './style.css'

let varAcumulador: number = 0
let varOperador: string = ""

const txtResultado: HTMLElement | null = document.getElementById('txtResultado')

const btnCe: HTMLElement | null = document.getElementById('btnCe');
btnCe?.addEventListener('click', limpiarTxtResultado)

const btnC: HTMLElement | null = document.getElementById('btnC')
btnC?.addEventListener('click', limpiarTxtResultado)

function limpiarTxtResultado() {
  if (txtResultado) {
    txtResultado.innerText = "0";
    varAcumulador = 0
    varOperador = ""
  }
}


const btnRetroceso: HTMLElement | null = document.getElementById('btnRetroceso')
btnRetroceso?.addEventListener('click', () => {
  if (!txtResultado) {
    return;
  }

  let resultado: string = txtResultado.innerText;

  // Parsear el resultado solamente si es un número válido
  const numeroParseado: number = parseInt(resultado);
  if (!isNaN(numeroParseado)) {
    // Si el resultado es un número válido, eliminar el último dígito
    resultado = resultado.slice(0, -1);
    txtResultado.innerText = resultado;
  }

  if (txtResultado.innerText === '') {
    txtResultado.innerText = '0'
  }

});



//! Botones de los números y función para modificar la ventana de los resultados -------------------
const btnNum0: HTMLElement | null = document.getElementById('btnNum0')
btnNum0?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('0')
})

const btnNum1: HTMLElement | null = document.getElementById('btnNum1')
btnNum1?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('1')
})

const btnNum2: HTMLElement | null = document.getElementById('btnNum2')
btnNum2?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('2')
})

const btnNum3: HTMLElement | null = document.getElementById('btnNum3')
btnNum3?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('3')
})

const btnNum4: HTMLElement | null = document.getElementById('btnNum4')
btnNum4?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('4')
})

const btnNum5: HTMLElement | null = document.getElementById('btnNum5')
btnNum5?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('5')
})

const btnNum6: HTMLElement | null = document.getElementById('btnNum6')
btnNum6?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('6')
})

const btnNum7: HTMLElement | null = document.getElementById('btnNum7')
btnNum7?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('7')
})

const btnNum8: HTMLElement | null = document.getElementById('btnNum8')
btnNum8?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('8')
})

const btnNum9: HTMLElement | null = document.getElementById('btnNum9')
btnNum9?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  modificarTxtResultado('9')
})

function modificarTxtResultado(numero: string) {
  if (txtResultado == null) { return }

  if (varOperador === "") {
    if (txtResultado?.innerText !== '0') {
      txtResultado.innerText += numero
    } else {
      txtResultado.innerText = numero
    }
  }  else {

    if (varOperador === "sumar") {
      varAcumulador = varAcumulador + parseInt(numero)
      txtResultado.innerText = varAcumulador.toString()
    }

    if (varOperador === "restar") {
      varAcumulador = varAcumulador - parseInt(numero)
      txtResultado.innerText = varAcumulador.toString()
    }

    if (varOperador === "multiplicar") {
      varAcumulador = varAcumulador * parseInt(numero)
      txtResultado.innerText = varAcumulador.toString()
    }
    
    if (varOperador === "dividir") {
      varAcumulador = varAcumulador / parseInt(numero)
      txtResultado.innerText = varAcumulador.toString()
    }

  }

}

//! --------------------------------------------------------------------------------------


const btnComa: HTMLElement | null = document.getElementById('btnComa')
btnComa?.addEventListener('click', () => {
  if (txtResultado == null) { return }
  if (txtResultado?.innerText.indexOf(".") !== -1) { return } //* Si ya se había utilizado la coma (punto) anteriormente.

  if (txtResultado?.innerText !== '0') {
    txtResultado.innerText += "."
  } else {
    txtResultado.innerText = "0."
  }
})




//! Operaciones aritméticas:
const btnSumar: HTMLElement | null = document.getElementById('btnSumar')
btnSumar?.addEventListener('click', () => {
  if (txtResultado == null) { return }

  varOperador = "sumar"
  varAcumulador = parseInt(txtResultado.innerText)

})

const btnRestar: HTMLElement | null = document.getElementById('btnRestar')
btnRestar?.addEventListener('click', () => {
  if (txtResultado == null) { return }

  varOperador = "restar"
  varAcumulador = parseInt(txtResultado.innerText)

})

const btnMultiplicar: HTMLElement | null = document.getElementById('btnMultiplicar')
btnMultiplicar?.addEventListener('click', () => {
  if (txtResultado == null) { return }

  varOperador = "multiplicar"
  varAcumulador = parseInt(txtResultado.innerText)

})

const btnDividir: HTMLElement | null = document.getElementById('btnDividir')
btnDividir?.addEventListener('click', () => {
  if (txtResultado == null) { return }

  varOperador = "dividir"
  varAcumulador = parseInt(txtResultado.innerText)
})





// const btnIgual: HTMLElement | null = document.getElementById('btnIgual')
// btnIgual?.addEventListener('click', () => {
//   console.log('')
// })
