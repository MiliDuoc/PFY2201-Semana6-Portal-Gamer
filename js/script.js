// =========================================
// FETCH API - NOVEDADES GAMER
// =========================================

/**
 * Obtiene las novedades desde un archivo JSON utilizando Fetch API.
 * Luego envía los datos obtenidos para mostrarlos dinámicamente en el DOM.
 */
function cargarNovedades() {
    fetch("data/novedades.json")
        .then(function (respuesta) {

            // Comprueba que el archivo se haya cargado correctamente.
            if (!respuesta.ok) {
                throw new Error("No fue posible cargar las novedades.");
            }

            return respuesta.json();
        })
        .then(function (datos) {
            mostrarNovedades(datos);
        })
        .catch(function (error) {
            mostrarErrorNovedades(error);
        });
}

/**
 * Crea los elementos HTML de cada novedad utilizando
 * createElement y appendChild.
 */
function mostrarNovedades(novedades) {
    const contenedor = document.getElementById("contenido-novedades");

    novedades.forEach(function (novedad) {

        const columna = document.createElement("div");
        columna.classList.add("col-12", "col-md-4");

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "h-100");

        const cuerpo = document.createElement("div");
        cuerpo.classList.add("card-body");

        const titulo = document.createElement("h3");
        titulo.classList.add("card-title", "h5");
        titulo.textContent = novedad.titulo;

        const descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.textContent = novedad.descripcion;

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(descripcion);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);
    });

    // Aplica los eventos mouseover también a las tarjetas creadas dinámicamente.
    configurarEfectoTarjetas();
}

/**
 * Muestra un mensaje en caso de que ocurra
 * un error al cargar los datos.
 */
function mostrarErrorNovedades(error) {
    const contenedor = document.getElementById("contenido-novedades");

    const mensaje = document.createElement("p");
    mensaje.classList.add("alert", "alert-danger");
    mensaje.textContent = "No fue posible cargar las novedades.";

    contenedor.appendChild(mensaje);

    console.error(error);
}

// Inicia la carga de datos.
cargarNovedades();

// =========================================
// EVENTO CLICK - CARRO DE COMPRAS
// =========================================

// Cantidad inicial de productos agregados al carro.
let cantidadCarro = 0;

/**
 * Configura el evento click de los botones "Agregar al carro"
 * y actualiza el contador visible en la barra de navegación.
 */
function configurarCarro() {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    const contadorCarro = document.getElementById("contador-carro");

    botonesAgregar.forEach(function (boton) {
        boton.addEventListener("click", function () {
            cantidadCarro++;
            contadorCarro.textContent = cantidadCarro;
        });
    });
}

// Activa los eventos del carro.
configurarCarro();

// =========================================
// EVENTO MOUSEOVER - TARJETAS DE PRODUCTOS
// =========================================

/**
 * Configura efectos visuales al pasar el mouse sobre las
 * tarjetas de productos y los elimina al retirar el cursor.
 */
function configurarEfectoTarjetas() {
    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(function (tarjeta) {

        tarjeta.addEventListener("mouseover", function () {
            tarjeta.style.backgroundColor = "#f0f0ff";
        });

        tarjeta.addEventListener("mouseout", function () {
            tarjeta.style.backgroundColor = "#ffffff";
        });

    });
}

// Activa los eventos mouseover y mouseout.
configurarEfectoTarjetas();

// =========================================
// EVENTO SUBMIT - FORMULARIO DE SUSCRIPCIÓN
// =========================================

/**
 * Configura el envío del formulario de suscripción.
 * Evita que la página se recargue y muestra un mensaje
 * de confirmación utilizando los datos ingresados.
 */
function configurarFormulario() {
    const formulario = document.getElementById("form-suscripcion");
    const mensaje = document.getElementById("mensaje-suscripcion");

    formulario.addEventListener("submit", function (evento) {
        // Evita el comportamiento normal de recargar la página.
        evento.preventDefault();

        // Obtiene los datos ingresados por el usuario.
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;

        // Muestra un mensaje dinámico de confirmación.
        mensaje.textContent =
            "¡Gracias, " + nombre + "! Te enviaremos nuestras novedades a " + correo + ".";

        mensaje.classList.add("alert", "alert-success");

        // Limpia los campos después de una suscripción exitosa.
        formulario.reset();
    });
}

// Activa el evento submit del formulario.
configurarFormulario();