function establecerImagenCovid(){
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
    this.style.display = 'none';
}

function eliminarAlClicarCovid(){
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


function crearCovid(){
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

function restartGame(enemigos){
    var covidContainer = document.querySelectorAll('.contenedorCovid');
    for (var i = 0; i < covidContainer.length; i++) {
        covidContainer[i].style.display = "none";
    }

    botonStart = document.getElementById("startButton");
    console.log(botonStart);
    botonStart.removeAttribute("hidden");
}

function startGame( enemigos ){

    enemigos = parseInt(enemigos, 10);
    for (var i = 0; i < enemigos; i++) {
        crearCovid();
    }

    dotarMovimientoCovid();
    setInterval(dotarMovimientoCovid, 4000);
    eliminarAlClicarCovid();
    establecerImagenCovid();
}

botonStart = document.getElementById("startButton");
botonStart.addEventListener("click", (event) => {
    event.target.setAttribute("hidden", true);
});