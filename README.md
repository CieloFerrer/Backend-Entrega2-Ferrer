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