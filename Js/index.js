


let intentos = 6; // Número de intentos permitidos
let palabraSecreta = "APPLE"; // Palabra a adivinar
let contenedor = document.getElementById('guesses'); // Contenedor de resultados

fetch('https://random-word.ryanrk.com/api/en/word/random/?length=5')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
         palabraSecreta = data[0].toUpperCase();
        console.log('Palabra Secreta:', palabraSecreta);
        // Aquí puedes agregar el código para manejar la palabra secreta
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// Ejecutar la función `init` cuando se carga la página
window.addEventListener('load', init);

function init() {
    // Obtener el botón y agregarle un evento de click que llama a la función `intentar`
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
    
    // Función que se ejecuta cuando el usuario intenta adivinar la palabra
    function intentar() {
        contenedor.innerHTML = "<h1></h1>"; // Mostrar el mensaje
        // Leer el intento del usuario
        const INTENTO = leerIntento();
        console.log(INTENTO);

        // Verificar si el intento es correcto
       
         if (INTENTO.length !== 5) {
            contenedor.innerHTML = "<h1>Favor Ingrese 5 Letras!😀</h1>"; // Mostrar el mensaje
            return;
        }
        

        // Obtener el contenedor de la cuadrícula y crear una nueva fila
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';

        // Comparar cada letra del intento con la palabra
        for (let i in palabraSecreta) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i] === palabraSecreta[i]) { // Letra correcta en la posición correcta (verde)
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'green';
            } else if (palabraSecreta.includes(INTENTO[i])) { // Letra correcta en la posición incorrecta (amarillo)
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'yellow';
            } else { // Letra incorrecta (gris)
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'grey';
            }
            ROW.appendChild(SPAN); // Añadir el span a la fila
        }


        GRID.appendChild(ROW); // Añadir la fila a la cuadrícula

        if (INTENTO === palabraSecreta) {
            console.log("GANASTE!");
            terminar("<h1>GANASTE!😀</h1>");
            return; //  de la función si el usuario gana
        }// salir el juego

        intentos--; // Reducir el número de intentos restantes
        if (intentos === 0) {
            console.log("PERDISTE!");
            terminar("<h1>PERDISTE!😖</h1>");
        }
    }

    // Función para leer el intento del usuario
    function leerIntento() {
        let intento = document.getElementById("guess-input").value; // Obtener el valor del input
        intento = intento.toUpperCase(); // Convertir a mayúsculas
        return intento; // Devolver el intento
    }

    // Función para terminar el juego, mostrando un mensaje y desactivando las entradas
    function terminar(mensaje) {
        const INPUT = document.getElementById("guess-input");
        const BOTON = document.getElementById("guess-button");
        INPUT.disabled = true; // Desactivar el input
        BOTON.disabled = true; // Desactivar el botón
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = mensaje; // Mostrar el mensaje
    }
  

}



