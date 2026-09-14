# Portal Gamer - Formativa Semana 5

Proyecto desarrollado para la asignatura Desarrollo Frontend I (PFY2201).

## Objetivo

Incorporar JavaScript al sitio Portal Gamer para mejorar su interactividad mediante la manipulación del DOM, gestión de eventos y carga dinámica de datos utilizando Fetch API.

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

### Manipulación del DOM

Se utiliza JavaScript para seleccionar, crear y modificar elementos dinámicamente mediante métodos como:

- `getElementById()`
- `querySelectorAll()`
- `createElement()`
- `appendChild()`
- `textContent`
- `classList`

### Eventos JavaScript

Se implementaron diferentes eventos para mejorar la interacción del usuario:

- `click`: permite agregar productos al carro y actualizar su contador.
- `mouseover`: modifica visualmente las tarjetas al pasar el cursor sobre ellas.
- `mouseout`: devuelve las tarjetas a su estado visual original.
- `submit`: procesa el formulario de suscripción sin recargar la página.

### Fetch API

La sección "Novedades Gamer" utiliza Fetch API para obtener información desde el archivo `data/novedades.json`.

Los datos obtenidos son procesados y mostrados dinámicamente en el sitio mediante JavaScript.

También se implementó manejo de errores mediante `.catch()`.

## Diseño responsivo

El sitio mantiene el diseño responsivo desarrollado con Bootstrap y adapta sus contenidos a diferentes tamaños de pantalla.

La sección de productos utiliza:

- `col-12` en dispositivos móviles
- `col-md-6` en tablets
- `col-lg-4` en escritorio

## Pruebas realizadas

El funcionamiento del sitio fue probado en:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Se verificó el funcionamiento del carrusel, carro de compras, eventos del mouse, formulario de suscripción y carga dinámica de novedades.

## Evidencias

La carpeta `capturas` contiene evidencias del funcionamiento de:

- Pruebas en Chrome, Edge y Firefox
- Evento `click` y contador del carro
- Evento `mouseover`
- Carga de novedades mediante Fetch API
- Evento `submit` del formulario

## Sitio publicado

GitHub Pages:

Pendiente de publicación de Semana 5.