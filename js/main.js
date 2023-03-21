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

function eliminarAlClicarCovid() {
    var elements = document.getElementsByClassName("covid");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', eliminarCovid);
    }
}

function dotarMovimientoCovid() {
    var covidContainer = document.querySelectorAll('.contenedorCovid');
    var container = document.getElementById("pantallaVideojuego");
    var parentWidth = container.offsetWidth;
    var parentHeight = container.offsetHeight;
    var containerRect = container.getBoundingClientRect();
    for (var i = 0; i < covidContainer.length; i++) {
        var crystal = covidContainer[i];
        var crystalWidth = crystal.offsetWidth;
        var crystalHeight = crystal.offsetHeight;
        var maxX = parentWidth - crystalWidth - containerRect.left;
        var maxY = parentHeight - crystalHeight - containerRect.top;
        var x = Math.floor(Math.random() * maxX);
        var y = Math.floor(Math.random() * maxY);
        TweenLite.to(crystal, 5, { left: x, top: y, ease: Linear.easeNone });
    }
}

function crearCovid() {
    var pantallaJuego = document.getElementById("pantallaVideojuego");
    const covidDiv = document.createElement("div");
    const covidButton = document.createElement("button");
    const covidImage = document.createElement("img");

    covidDiv.className = "contenedorCovid";
    covidButton.className = "covid";
    covidImage.classList = "covidImage";
    covidImage.src = "images/covid.png";

    covidButton.appendChild(covidImage);
    covidDiv.appendChild(covidButton);
    pantallaJuego.appendChild(covidDiv);
}

function restartGame() {
    var covidContainer = document.querySelectorAll('.contenedorCovid');
    for (var i = 0; i < covidContainer.length; i++) {
        covidContainer[i].style.display = "none";
    }

    botonStart = document.getElementById("startButton");
    botonStart.removeAttribute("hidden");
}

function crearProyectil() {
    var bolaDiscoteca = document.getElementById("contenedorBolaDiscoteca");
    var pantallaJuego = document.getElementById("pantallaVideojuego");

    var rect = bolaDiscoteca.getBoundingClientRect();
    const contenedorProyectil = document.createElement("div");
    const proyectil = document.createElement("img");

    proyectil.src = "images/jeringaXL.png";
    contenedorProyectil.className = "miProyectil";
    contenedorProyectil.style.top = rect.top + "px";
    contenedorProyectil.style.left = rect.left + "px";
    contenedorProyectil.setAttribute("hidden", true);

    contenedorProyectil.appendChild(proyectil);
    pantallaJuego.appendChild(contenedorProyectil);
}

function lanzarProyectil(e) {

    contenedorProyectil = document.getElementsByClassName("miProyectil")[0];
    if (contenedorProyectil) {
        contenedorProyectil.remove();
    }

    crearProyectil();

    cursorX = e.pageX;
    cursorY = e.pageY;

    contenedorProyectil = document.getElementsByClassName("miProyectil")[0];
    contenedorProyectil.removeAttribute("hidden");

    TweenLite.to(contenedorProyectil, 3, { left: cursorX, top: cursorY, ease: Linear.easeNone });
}

function esMismaPosicion(elem1, elem2) {
    var elem1Pos = elem1.getBoundingClientRect();
    var elem2Pos = elem2.getBoundingClientRect();

    if (elem1Pos.top == elem2Pos.top && elem1Pos.left == elem2Pos.left) {
        return true;
    }
    return false;
}

function prepararPantallaVideojuego() {
    document.addEventListener('click', lanzarProyectil, true);
}

function estanColisinando(element1, element2) {
    if ( element1 && element2){
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

function detectarColisionJeringa(){
    proyectil = document.getElementsByClassName("miProyectil")[0];
    covidContainer = document.querySelectorAll('.contenedorCovid');
    for (var i = 0; i < covidContainer.length; i++) {
        if (estanColisinando(proyectil, covidContainer[i])){
           covidContainer[i].remove();
        }
    }
}

function startGame(enemigos) {

    enemigos = parseInt(enemigos, 10);
    for (var i = 0; i < enemigos; i++) {
        crearCovid();
    }

    dotarMovimientoCovid();
    setInterval(dotarMovimientoCovid, 4000);
    eliminarAlClicarCovid();
    establecerImagenCovid();

    botonStart = document.getElementById("startButton");
    botonStart.setAttribute("hidden", true);

    prepararPantallaVideojuego();

    detectarColisionJeringa();
    setInterval(detectarColisionJeringa,10);
}