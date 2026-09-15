# Portal Gamer - Sumativa Semana 6

Proyecto desarrollado para la asignatura Desarrollo Frontend I (PFY2201).

## Objetivo

Optimizar la lógica y funcionalidad del sitio web Portal Gamer mediante Bootstrap 5 y JavaScript, incorporando carga dinámica de productos, manipulación del DOM, eventos de usuario, búsqueda, carrito de compras y manejo de errores con Fetch API.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5.3.8
- JavaScript
- DOM
- Fetch API
- JSON
- Git y GitHub
- GitHub Pages

## Funcionalidades implementadas

### Catálogo dinámico de productos

Los productos se cargan desde el archivo local `productos.json` utilizando Fetch API.

JavaScript genera dinámicamente las tarjetas de cada videojuego, incluyendo:

- Imagen
- Nombre
- Descripción
- Precio
- Botón para agregar al carro

### Barra de navegación

La barra de navegación fue desarrollada con Bootstrap 5 y se adapta a dispositivos móviles.

Incluye las categorías:

- Acción
- Aventura

Al seleccionar una categoría, JavaScript filtra dinámicamente los productos correspondientes.

### Buscador de productos

Se implementó un formulario de búsqueda utilizando el evento `submit`.

Permite buscar videojuegos por nombre o categoría y muestra un mensaje cuando no existen resultados.

### Carro de compras

Mediante el evento `click`, el usuario puede agregar videojuegos al carro.

El resumen del carro se actualiza dinámicamente mostrando:

- Productos agregados
- Cantidad de productos
- Precio de cada producto
- Total de la compra

### Manipulación del DOM

JavaScript crea y actualiza elementos dinámicamente mediante métodos como:

- `getElementById()`
- `querySelectorAll()`
- `createElement()`
- `appendChild()`
- `textContent`
- `classList`

### Fetch API y manejo de errores

Fetch API obtiene los productos desde `productos.json`.

Se implementaron validaciones para comprobar la respuesta y el formato de los datos recibidos.

En caso de error, el sitio muestra un mensaje amigable al usuario.

Además, la sección Novedades Gamer carga contenido dinámicamente desde `data/novedades.json`.

## Diseño responsivo

El sitio utiliza Bootstrap 5 y CSS para adaptarse a distintos tamaños de pantalla.

La cuadrícula de productos utiliza:

- `col-12` en dispositivos móviles
- `col-md-6` en tablets
- `col-lg-4` en escritorio

La barra de navegación utiliza el componente Navbar de Bootstrap y se transforma en un menú desplegable en pantallas pequeñas.

## Pruebas realizadas

Se verificó el funcionamiento de:

- Carga dinámica de productos mediante Fetch API
- Filtrado por categorías
- Búsqueda de videojuegos
- Evento `click` del carro
- Actualización dinámica del resumen del carro
- Evento `submit`
- Manejo de búsquedas sin resultados
- Manejo de errores de carga
- Navegación responsiva
- Carrusel automático
- Sección Novedades Gamer

## Estructura principal

```text
index.html
productos.json
assets/
├── css/
│   └── styles.css
├── img/
└── js/
    └── script.js
data/
└── novedades.json
```

## Sitio publicado

Repositorio GitHub:

Pendiente de publicación de Semana 6.

GitHub Pages:

Pendiente de publicación de Semana 6.