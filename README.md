# Tienda de muebles

Proyecto personal de aprendizaje para entender cómo funciona Express
y cómo conectarlo con un front en React. No está pensado para producción.

## Qué practiqué

- API REST con Express, separada en rutas, controladores, servicios y modelos
- SQLite con `node:sqlite`
- Login con JWT en cookie httpOnly y contraseñas con bcrypt
- Middlewares y rutas protegidas
- React con TypeScript, loaders de React Router y Tailwind

## Limitaciones conocidas

- No tiene tests
- La validación está escrita a mano y se repite entre crear y editar
- El formulario no muestra los errores por campo que devuelve la API
- No hay registro de usuarios: el administrador se crea directo en la base
- Eliminar productos solo está disponible en la API
- La URL de la API está fija en el cliente

## Cómo ejecutarlo

Requiere una versión reciente de Node (probado con la 24).

Crea `server/.env`:

```
JWT_SECRET=una_clave_secreta
CLIENT_URL=http://localhost:5173
```

Servidor:

```
cd server
npm install
npm run dev
```

Cliente, en otra terminal:

```
cd client
npm install
npm run dev
```
