import express from 'express';
import productosRoutes from "./routes/productos.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

//middlewares globales
app.use(express.json());

//rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

//404
app.use((req, res) =>{
    res.status(404).json({msg: 'Ruta no encontrada'});
})

app.use((err, req, res, next)=>{
    if(err.type === 'entity.parse.failed'){
        return res.status(400).json({ msg: 'JSON inválido'});
    }
    console.error(err);
    res.status(500).json({msg: 'Error en el servidor'});
});

export default app;