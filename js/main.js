var idGeneradorCovid;
var idDetectorColisiones;
var idComprobacionVictoria;
var idEliminadorJeringas

function establecerImagenCovid() {
    const images = document.querySelectorAll(".covidImage");
    images.forEach(image => {
        image.addEventListener("mouseover", () => {
            image.src = "images/covidSeleccionado.png";
        });

        image.addEventListener("mouseout", () => {
            image.src = "images/covid.png";
        });

    })
}

function eliminarCovid() {
    this.remove();
}

function eliminarAlClicarCovid(covid) {
    covid.addEventListener("click", () => {
        covid.remove();
    });
}

function generarPosicionAleatoria(elemento, contenedor) {
    var mainWidth = contenedor.clientWidth;
    var mainHeight = contenedor.clientHeight;
    var x = Math.random() * (mainWidth - elemento.offsetWidth);
    var y = Math.random() * (mainHeight - elemento.offsetHeight);
    return [x, y];
}

function dotarMovimientoCovid(covidContainer, container) {
    posicion = generarPosicionAleatoria(covidContainer, container);
    TweenLite.to(covidContainer, 5, { left: posicion[0], top: posicion[1], ease: Linear.easeNone });
}

function crearCovid() {
    const pantallaJuego = document.getElementById("pantallaVideojuego");
    const covidDiv = document.createElement("div");
    const covidButton = document.createElement("button");
    const covidImage = document.createElement("img");

    covidDiv.className = "contenedorCovid";
    covidButton.className = "covid";
    covidImage.classList = "covidImage";
    covidImage.src = "images/covid.png";
    posicion = generarPosicionAleatoria(covidDiv, pantallaJuego);
    covidDiv.style.left = posicion[0] + "px";
    covidDiv.style.top = posicion[1] + "px";

    covidButton.appendChild(covidImage);
    covidDiv.appendChild(covidButton);
    pantallaJuego.appendChild(covidDiv);
    establecerImagenCovid();
    dotarMovimientoCovid(covidDiv, pantallaJuego);
    retardoRespawn = Math.floor(Math.random() * (4000 - 1000 + 1) + 1000);
    setInterval(dotarMovimientoCovid, retardoRespawn, covidDiv, pantallaJuego);
    eliminarAlClicarCovid(covidDiv);
    return covidDiv;
}

function restartGame() {
    var covidContainer = document.querySelectorAll('.contenedorCovid');
    for (var i = 0; i < covidContainer.length; i++) {
        covidContainer[i].remove();
    }
    finalizarPartida();

    botonStart = document.getElementById("startButton");
    botonStart.removeAttribute("hidden");
}

function crearProyectil() {
    var bolaDiscoteca = document.getElementById("contenedorBolaDiscoteca");
    var pantallaJuego = document.getElementById("pantallaVideojuego");

    var rect = bolaDiscoteca.getBoundingClientRect();
    const contenedorProyectil = document.createElement("div");
    const proyectil = document.createElement("img");

    proyectil.src = "images/jeringa.png";
    contenedorProyectil.className = "miProyectil";
    contenedorProyectil.style.top = ((rect.bottom + rect.top) / 2) + "px";
    contenedorProyectil.style.left = ((rect.left + rect.right) / 2) + "px";
    contenedorProyectil.setAttribute("hidden", true);

    contenedorProyectil.appendChild(proyectil);
    pantallaJuego.appendChild(contenedorProyectil);

    detectarColisionJeringa(contenedorProyectil);
    idDetectorColisiones = setInterval(detectarColisionJeringa, 100, contenedorProyectil);

    return contenedorProyectil;
}

function lanzarProyectil(e) {

    contenedorProyectil = crearProyectil();

    cursorX = e.pageX;
    cursorY = e.pageY;

    contenedorProyectil.removeAttribute("hidden");

    var dx = cursorX - contenedorProyectil.offsetLeft;
    var dy = cursorY - contenedorProyectil.offsetTop;
    var angle = Math.atan2(dy, dx);

    // Mover el contenedor en la dirección del ángulo utilizando TweenLite
    TweenLite.to(contenedorProyectil, 2.5, {
        left: "+=" + Math.cos(angle) * 2000,
        top: "+=" + Math.sin(angle) * 2000,
        ease: Linear.easeNone
    });
}

function prepararPantallaVideojuego() {
    document.addEventListener('click', lanzarProyectil, true);
}

function estanColisinando(element1, element2) {
    if (element1 && element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        if (rect1.left < rect2.right && rect1.right > rect2.left &&
            rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
            return true;
        } else {
            return false;
        }
    }
}

function detectarColisionJeringa(proyectil) {
    covidContainer = document.querySelectorAll('.contenedorCovid');
    for (var i = 0; i < covidContainer.length; i++) {
        if (estanColisinando(proyectil, covidContainer[i])) {
            covidContainer[i].remove();
        }
    }
}

function moverBolaDiscoteca() {
    const bolaDiscoteca = document.getElementById('contenedorBolaDiscoteca');
    const arrowX = bolaDiscoteca.offsetLeft + bolaDiscoteca.offsetWidth;
    const arrowY = bolaDiscoteca.offsetTop + bolaDiscoteca.offsetHeight;

    document.addEventListener('mousemove', function (event) {
        const rad = Math.atan2(event.pageY - arrowY, event.pageX - arrowX) - Math.PI / 2;
        bolaDiscoteca.style.transform = 'rotate(' + rad + 'rad)';
    });
}

function spawnCovid() {
    crearCovid();
}

function comprobarVictoria() {
    var covidContainer = document.querySelectorAll('.contenedorCovid');
    if (covidContainer.length == 0) {
        finalizarPartida();
        crearMensajeVictoria();
    }
}

function finalizarPartida() {
    if (document.getElementById('contenedorVictoria')) {
        document.getElementById('contenedorVictoria').remove();
    }
    document.removeEventListener('click', lanzarProyectil, true);
    clearInterval(idDetectorColisiones);
    clearInterval(idGeneradorCovid);
    clearInterval(idComprobacionVictoria);
    clearInterval(idEliminadorJeringas);
}

function crearMensajeVictoria() {
    var pantallaJuego = document.getElementById("pantallaVideojuego");
    var mensajeVictoria = document.createElement("h2");
    var contenedorVictoria = document.createElement("div");
    contenedorVictoria.id = "contenedorVictoria";
    mensajeVictoria.innerHTML = "YOU WON";
    mensajeVictoria.id = "mensajeVictoria";
    contenedorVictoria.appendChild(mensajeVictoria);
    pantallaJuego.appendChild(contenedorVictoria);
}

function isInside(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
        rect1.top >= rect2.top &&
        rect1.left >= rect2.left &&
        rect1.bottom <= rect2.bottom &&
        rect1.right <= rect2.right
    );
}

function eliminarJeringas() {
    const jeringas = document.querySelectorAll(".miProyectil");
    var pantallaJuego = document.getElementById("pantallaVideojuego");
    jeringas.forEach(jeringa => {
        if (!isInside(jeringa, pantallaJuego)) {
            console.log("Esta esta fuera");
            jeringa.remove();
        }
    })
}

function startGame(enemigos) {

    spawnCovid();
    idGeneradorCovid = setInterval(spawnCovid, 1500);

    botonStart = document.getElementById("startButton");
    botonStart.setAttribute("hidden", true);

    prepararPantallaVideojuego();

    moverBolaDiscoteca();

    comprobarVictoria();
    idComprobacionVictoria = setInterval(comprobarVictoria, 100);

    eliminarJeringas();
    idEliminadorJeringas = setInterval(eliminarJeringas, 100);
}