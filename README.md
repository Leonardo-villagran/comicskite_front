# Front Comicskites

Esta es una aplicación React creada con Vite, la cual consiste en un sitio estático de venta de comics en línea, el cual se conecta a un backend con Express, donde se realizan las solicitudes a una base de datos de tipo Postgres. 

## Integrantes grupo 7

- Lorenzo Chacano
- Paolo Landeros
- Leonardo Villagrán

## Tabla de contenidos

- [Resumen](#resumen)
- [Instalación](#instalación)
- [Funcionalidades](#funcionalidades)
- [Dependencias](#dependencias)
- [Dependencias de desarrollo](#dependencias-de-desarrollo)
- [Uso](#uso)
- [Contexto](#contexto)
- [Rutas](#rutas)
- [Deploy](#deploy)
- [Screenshots](#screenshots)

## Resumen

Esta aplicación React utiliza Vite como herramienta de compilación y React Router para la navegación. Proporciona diversas vistas para interactuar con diferentes funcionalidades, como ver productos, administrar favoritos, perfil de usuario y carrito de compras.

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

Frontend: 

1. Clona el repositorio del frontend: `git clone https://github.com/Leonardo-villagran/comicskite_front`
2. Ingresa al directorio del proyecto: `cd comicskite_front`
3. Instala las dependencias: `npm install`

Backend:

4. Clona el repositorio del Backend:  `https://github.com/LanderosPaolo/Backend_proyecto_final`
5. Ingresa al directorio del proyecto: `backend_proyecto_final`
6. Instala las dependencias: `npm install`
7. Generar el archivo .env con las siguientes variables:

```
## Local
PORT=5000
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=comics
JWT_SECRET=ultrasecreto
```

Nota: Los datos contenidos de las variables son solo ejemplos, generar según su configuración local.  

Base de datos:

7. Crea una base de datos llamada comics en Postgres.
8. Ejecuta las sentencias de SQL en el archivo `comics.sql`  en la raíz del backend.

## Funcionalidades

- Vista de inicio (Home)
- Vista de registro (Registrar)
- Vista de inicio de sesión (Iniciar sesión)
- Vista de productos (Productos)
- Vista de favoritos (Favoritos)
- Vista de perfil de usuario (Perfil)
- Vista de publicaciones (Publicaciones)
- Vista para agregar nuevo producto (Nuevo producto)
- Vista para editar producto (Editar producto)
- Vista del carrito de compras (Carrito de compras)
- Vista de detalles del producto (Detalles del producto)
- Vista de confirmación de orden (Orden de compra)
- Vista de cierre de sesión (Salir)
- Vista de error 404 (No encontrado)

## Dependencias

El proyecto utiliza las siguientes dependencias:

- @emotion/react
- @emotion/styled
- @mui/material
- axios
- bootstrap
- firebase
- jwt-decode
- react
- react-bootstrap
- react-dom
- react-icons
- react-router-dom
- react-scripts
- react-toastify
- uuid

## Dependencias de desarrollo

- @types/react
- @types/react-dom
- @vitejs/plugin-react-swc
- dotenv
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- gh-pages
- vite

## Uso

1. Para ejecutar Frontend en la carpeta `comicskite_front`, utiliza el siguiente comando:

```bash
npm run dev
```
Esto iniciará el frontend y podrás acceder a la aplicación en tu navegador web en `http://localhost:5173/`.

2. Para ejecutar el servidor del Backend en la carpeta `backend_proyecto_final`, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de backend y podrás acceder en `http://localhost:5000/`.

## Contexto

La aplicación utiliza un proveedor de contexto (Context) para gestionar el estado global. Los siguientes estados globales están disponibles:

- `productos`: Estado de tipo array para almacenar los productos.
- `producto`: Estado para almacenar un solo producto.
- `carrito`: Estado de tipo array para gestionar el carrito de compras.
- `tokenContent`: Estado para almacenar el contenido decodificado del token.

## Rutas

La aplicación contiene las siguientes rutas:

- `/`: Vista de inicio (Home). Si el usuario está autenticado (tiene un token), se redirecciona a la vista de "Productos"; de lo contrario, se muestra la página de inicio.
- `/registrar`: Vista de registro (Registrar). Se redirecciona a la página de inicio si el usuario ya está autenticado.
- `/iniciar_sesion`: Vista de inicio de sesión (Iniciar sesión). Se redirecciona a la página de inicio si el usuario ya está autenticado.
- `/productos`: Vista de productos (Productos). Solo accesible para usuarios autenticados.
- `/favoritos`: Vista de favoritos (Favoritos). Solo accesible para usuarios autenticados.
- `/perfil`: Vista de perfil de usuario (Perfil). Solo accesible para usuarios autenticados.
- `/publicaciones`: Vista de publicaciones (Publicaciones). Solo accesible para usuarios autenticados.
- `/nuevo_producto`: Vista para agregar nuevo producto (Nuevo producto). Solo accesible para usuarios autenticados.
- `/editar_producto/:id_producto`: Vista para editar producto (Editar producto). Solo accesible para usuarios autenticados.
- `/carro_compras`: Vista del carrito de compras (Carrito de compras). Solo accesible para usuarios autenticados.
- `/detalles/:id_producto`: Vista de detalles del producto (Detalles del producto). Solo accesible para usuarios autenticados.
- `/orden_compra`: Vista de confirmación de orden (Orden de compra). Solo accesible para usuarios autenticados.
- `/salir`: Vista de cierre de sesión (Salir).
- `*`: Vista de error 404 (No encontrado).

## Deploy

Se realizó el deploy del Frontend, Backend y base de datos (Postgress) en Render.com, y subida de fotos a través de Firebase de Google. Se puede acceder directamente a la aplicación, a través de la siguiente dirección web: 

```bash
https://react-comicskites.onrender.com/
```
## Screenshots

![Imagen 1](https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fgithub%2FSin-t%C3%ADtulo-1.png?alt=media&token=9332bcff-3e0f-4764-ab4b-4ee1fa290b82)
![Imagen 2](https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fgithub%2FSin-t%C3%ADtulo-2.png?alt=media&token=daa86f1f-d4ed-4d35-99e8-1cfd6d3bd764)
![Imagen 3](https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fgithub%2FSin-t%C3%ADtulo-3.png?alt=media&token=0db88156-dc79-4855-a84b-984e5837c111)
![Imagen 4](https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fgithub%2FSin-t%C3%ADtulo-4.png?alt=media&token=d9505178-6f27-483b-a0be-fe59e48f19b2)
![Imagen 5](https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fgithub%2FSin-t%C3%ADtulo-5.png?alt=media&token=8a3ad586-438c-4243-bff5-43ba9f0b9614)



