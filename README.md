# Backend Entrega 1 - Gestión de Productos y Carritos

Este proyecto es una API REST desarrollada con Node.js y Express para la gestión de un sistema de e-commerce.

## Tecnologías utilizadas
* Node.js
* Express
* Sistema de persistencia por archivos (JSON)

## Estructura del Proyecto
* `/src/managers`: Lógica de manejo de archivos.
* `/src/routes`: Definición de endpoints.
* `/src/data`: Almacenamiento JSON.


# Backend Entrega 2 - Websockets & Handlebars

Este proyecto extiende la API anterior integrando un motor de plantillas para visualización web y comunicación bidireccional en tiempo real.

## Nuevas Tecnologías
* **Handlebars**: Motor de plantillas para renderizar vistas dinámicas desde el servidor.
* **Socket.io**: Implementación de Websockets para actualizaciones en tiempo real sin recargar el navegador.

## Nuevas Vistas
* `http://localhost:8080/`: Vista estática de los productos almacenados.
* `http://localhost:8080/realtimeproducts`: Vista dinámica que utiliza Websockets para agregar y eliminar productos en tiempo real.

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para descargar las dependencias.
3. Iniciar el servidor con `node src/app.js`.


# Backend Entrega Final - E-commerce Profesional

Este proyecto representa la culminación del curso, donde se migró la persistencia de archivos locales a una base de datos distribuida y se profesionalizaron todos los endpoints con técnicas avanzadas de consulta y relaciones.

## Tecnologías Destacadas (Trabajo Final)
* **MongoDB & Mongoose**: Transición a una base de datos NoSQL para una persistencia escalable y robusta.
* **Mongoose Paginate V2**: Implementación de paginación profesional para optimizar el rendimiento de las consultas.
* **Dotenv**: Gestión de variables de entorno para proteger información sensible.
* **Populate**: Uso de referencias cruzadas entre colecciones para desglosar información de productos dentro de los carritos.

## Gestión de Seguridad (.env)
Se implementó el uso de un archivo `.env` para manejar información crítica, como la cadena de conexión a **MongoDB Atlas**. 
* **Configuración**: El archivo `.env` está incluido en el `.gitignore`. Para que el proyecto funcione, se debe crear un archivo local con la variable `MONGO_URL`.

## Nuevos Endpoints y Funcionalidades
### Productos (`/api/products`)
* **Consultas Avanzadas**: Soporte para `limit`, `page`, `sort` (asc/desc) y `query` (filtro por categoría o disponibilidad).
* **Respuesta Estructurada**: El GET devuelve un objeto completo con metadata de navegación (páginas totales, links a previa/siguiente, etc.).

### Carritos (`/api/carts`)
* **Populate**: El endpoint `GET /:cid` ahora devuelve los productos con todo su detalle, no solo sus IDs.
* **Gestión Quirúrgica**: Nuevos métodos para:
    * Eliminar un producto específico del carrito.
    * Actualizar el carrito completo con un arreglo.
    * Actualizar únicamente la cantidad de un ejemplar.
    * Vaciar el carrito por completo (DELETE).

## Vistas de Usuario
* `/products`: Catálogo visual con botones de paginación y opción de agregar al carrito.
* `/carts/:cid`: Visualización detallada de un carrito específico con sus productos vinculados.

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Crear un archivo `.env` en la raíz con la variable `MONGO_URL=tu_url_de_mongo_atlas`.
4. Iniciar con `node src/app.js`.