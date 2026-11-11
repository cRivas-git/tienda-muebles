import express from 'express';
import productosRoutes from "./routes/productos.routes.js";

const app = express();

//middlewares globales
app.use(express.json());

//rutas
app.use('/api/productos', productosRoutes);

//404
app.use((req, res) =>{
    res.status(404).send({error: 'Ruta no encontrada'});
})

export default app;