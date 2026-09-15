// Guarda los productos cargados para poder buscarlos posteriormente.
let productosDisponibles = [];

// =========================================
// FETCH API - PRODUCTOS
// =========================================

/**
 * Obtiene los productos desde el archivo local productos.json
 * utilizando Fetch API.
 */
function cargarProductos() {
    fetch("productos.json")
        .then(function (respuesta) {

            // Comprueba que el archivo se haya cargado correctamente.
            if (!respuesta.ok) {
                throw new Error("No fue posible cargar los productos.");
            }

            return respuesta.json();
        })
        .then(function (productos) {
            productosDisponibles = productos;
            mostrarProductos(productos);
        })
        .catch(function (error) {
            mostrarErrorProductos(error);
        });
}

/**
 * Crea dinámicamente las tarjetas Bootstrap de los productos
 * y las agrega al DOM.
 */
function mostrarProductos(productos) {
    const contenedor = document.getElementById("lista-productos");

    // Limpia el contenedor antes de mostrar los productos.
    contenedor.innerHTML = "";

    productos.forEach(function (producto) {

        const columna = document.createElement("div");
        columna.classList.add("col-12", "col-md-6", "col-lg-4");

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "h-100");

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = "Portada del videojuego " + producto.nombre;
        imagen.classList.add("card-img-top", "imagen-producto");

        const cuerpo = document.createElement("div");
        cuerpo.classList.add("card-body", "d-flex", "flex-column");

        const titulo = document.createElement("h3");
        titulo.classList.add("card-title", "h5");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = "$" + producto.precio.toLocaleString("es-CL");

        const boton = document.createElement("button");
        boton.type = "button";
        boton.classList.add("btn", "btn-primary", "mt-auto", "btn-agregar");
        boton.dataset.id = producto.id;
        boton.textContent = "Agregar al carro";

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(descripcion);
        cuerpo.appendChild(precio);
        cuerpo.appendChild(boton);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(cuerpo);

        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);
    });

    // Los botones y tarjetas ya existen en el DOM,
    // por lo que ahora se pueden configurar sus eventos.
    configurarCarro();
    configurarEfectoTarjetas();
}

/**
 * Muestra un mensaje amigable si ocurre un error
 * durante la carga del archivo JSON.
 */
function mostrarErrorProductos(error) {
    const mensaje = document.getElementById("mensaje-productos");

    mensaje.textContent =
        "Lo sentimos, no fue posible cargar los productos. Intenta nuevamente más tarde.";

    mensaje.classList.add("alert", "alert-danger");

    console.error(error);
}

// Inicia la carga dinámica de productos.
cargarProductos();

// =========================================
// FETCH API - NOVEDADES GAMER
// =========================================

/**
 * Obtiene las novedades desde el archivo local novedades.json
 * y las muestra dinámicamente en la página.
 */
function cargarNovedades() {
    fetch("data/novedades.json")
        .then(function (respuesta) {

            if (!respuesta.ok) {
                throw new Error("No fue posible cargar las novedades.");
            }

            return respuesta.json();
        })
        .then(function (novedades) {
            mostrarNovedades(novedades);
        })
        .catch(function (error) {
            mostrarErrorNovedades(error);
        });
}

/**
 * Crea las tarjetas de novedades mediante manipulación del DOM.
 */
function mostrarNovedades(novedades) {
    const contenedor = document.getElementById("contenido-novedades");

    contenedor.innerHTML = "";

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

    configurarEfectoTarjetas();
}

/**
 * Muestra un mensaje amigable si las novedades
 * no pueden cargarse correctamente.
 */
function mostrarErrorNovedades(error) {
    const contenedor = document.getElementById("contenido-novedades");

    contenedor.innerHTML =
        '<p class="alert alert-danger">No fue posible cargar las novedades.</p>';

    console.error(error);
}

// Inicia la carga dinámica de novedades.
cargarNovedades();

// =========================================
// EVENTO CLICK - CARRO DE COMPRAS
// =========================================

// Cantidad inicial de productos agregados al carro.
let cantidadCarro = 0;
// Almacena los productos que el usuario agrega al carro.
let productosCarro = [];
/**
 * Configura el evento click de los botones "Agregar al carro".
 * Identifica el producto seleccionado y lo agrega al carro.
 */
function configurarCarro() {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    botonesAgregar.forEach(function (boton) {
        boton.addEventListener("click", function () {

            // Obtiene el identificador del producto desde el botón.
            const idProducto = Number(boton.dataset.id);

            // Busca el producto seleccionado dentro de los productos disponibles.
            const productoSeleccionado = productosDisponibles.find(function (producto) {
                return producto.id === idProducto;
            });

            // Agrega el producto al carro.
            if (productoSeleccionado) {
                productosCarro.push(productoSeleccionado);
                cantidadCarro++;

                actualizarResumenCarro();
            }
        });
    });
}
/**
 * Actualiza dinámicamente el contador, la lista de productos
 * y el total del carro de compras.
 */
function actualizarResumenCarro() {
    const contadorCarro = document.getElementById("contador-carro");
    const listaCarro = document.getElementById("lista-carro");
    const carroVacio = document.getElementById("carro-vacio");
    const totalCarro = document.getElementById("total-carro");

    // Actualiza el contador visible en la barra de navegación.
    contadorCarro.textContent = cantidadCarro;

    // Limpia la lista antes de volver a construirla.
    listaCarro.innerHTML = "";

    let total = 0;

    productosCarro.forEach(function (producto) {

        const elemento = document.createElement("li");
        elemento.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between"
        );

        elemento.textContent =
            producto.nombre + " - $" + producto.precio.toLocaleString("es-CL");

        listaCarro.appendChild(elemento);

        total += producto.precio;
    });

    // Muestra u oculta el mensaje inicial del carro.
    if (productosCarro.length > 0) {
        carroVacio.classList.add("d-none");
    } else {
        carroVacio.classList.remove("d-none");
    }

    // Actualiza el valor total de la compra.
    totalCarro.textContent =
        "Total: $" + total.toLocaleString("es-CL");
}

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

// =========================================
// EVENTO SUBMIT - BÚSQUEDA DE PRODUCTOS
// =========================================

/**
 * Configura el formulario de búsqueda y filtra los productos
 * cargados previamente desde productos.json.
 */
function configurarBusqueda() {
    const formularioBusqueda = document.getElementById("form-busqueda");
    const campoBusqueda = document.getElementById("buscar-producto");
    const mensaje = document.getElementById("mensaje-productos");

    formularioBusqueda.addEventListener("submit", function (evento) {

        // Evita que el formulario recargue la página.
        evento.preventDefault();

        // Obtiene el texto ingresado y lo normaliza para facilitar la búsqueda.
        const textoBusqueda = campoBusqueda.value.trim().toLowerCase();

        // Si el campo está vacío, vuelve a mostrar todos los productos.
        if (textoBusqueda === "") {
            mensaje.textContent = "";
            mensaje.className = "mt-3";
            mostrarProductos(productosDisponibles);
            return;
        }

        // Filtra los productos cuyo nombre o categoría coincidan con la búsqueda.
        const productosFiltrados = productosDisponibles.filter(function (producto) {
            return producto.nombre.toLowerCase().includes(textoBusqueda) ||
                   producto.categoria.toLowerCase().includes(textoBusqueda);
        });

        // Muestra los productos encontrados.
        mostrarProductos(productosFiltrados);

        // Informa al usuario cuando la búsqueda no encuentra resultados.
        if (productosFiltrados.length === 0) {
            mensaje.textContent =
                "No se encontraron videojuegos para tu búsqueda.";
            mensaje.className = "mt-3 alert alert-warning";
        } else {
            mensaje.textContent = "";
            mensaje.className = "mt-3";
        }
    });
}

// Activa el evento submit del formulario de búsqueda.
configurarBusqueda();

// =========================================
// EVENTO CLICK - CATEGORÍAS DE PRODUCTOS
// =========================================

/**
 * Configura los enlaces de categorías de la barra de navegación
 * para filtrar los productos cargados desde productos.json.
 */
function configurarCategorias() {
    const enlacesCategorias = document.querySelectorAll(".categoria-link");
    const mensaje = document.getElementById("mensaje-productos");
    const campoBusqueda = document.getElementById("buscar-producto");

    enlacesCategorias.forEach(function (enlace) {
        enlace.addEventListener("click", function () {

            // Obtiene la categoría almacenada en el atributo data-categoria.
            const categoriaSeleccionada = enlace.dataset.categoria;

            // Filtra los productos que pertenecen a la categoría seleccionada.
            const productosFiltrados = productosDisponibles.filter(function (producto) {
                return producto.categoria === categoriaSeleccionada;
            });

            // Limpia una búsqueda anterior y muestra los productos de la categoría.
            campoBusqueda.value = "";
            mensaje.textContent = "";
            mensaje.className = "mt-3";

            mostrarProductos(productosFiltrados);
        });
    });
}

// Activa el filtrado mediante las categorías de la barra de navegación.
configurarCategorias();

// =========================================
// EVENTO CLICK - MOSTRAR TODOS LOS PRODUCTOS
// =========================================

/**
 * Permite volver a mostrar el catálogo completo
 * al seleccionar "Productos" en la barra de navegación.
 */
function configurarVerTodosProductos() {
    const enlaceProductos = document.getElementById("ver-todos-productos");
    const campoBusqueda = document.getElementById("buscar-producto");
    const mensaje = document.getElementById("mensaje-productos");

    enlaceProductos.addEventListener("click", function () {
        campoBusqueda.value = "";
        mensaje.textContent = "";
        mensaje.className = "mt-3";

        mostrarProductos(productosDisponibles);
    });
}

// Activa el enlace para recuperar el catálogo completo.
configurarVerTodosProductos();