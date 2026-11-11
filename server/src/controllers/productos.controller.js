import * as Producto from '../models/producto.model.js'

export function listar(req, res){
    res.json(Producto.obtenerTodos());
}

export function obtenerPorId(req, res){
    const producto = Producto.obtenerPorId(req.params.id);
    if(!producto){
        return res.status(404).send('Producto no existe');
    }
    res.json(producto);
}

export function crear(req, res){
    const {nombre, descripcion, precio} = req.body;

    if(typeof nombre !== 'string' || nombre.trim() === ''){
        return res.status(400).json({ error: 'nombre es obligatorio' });
    }

    if(typeof descripcion !== 'string' || descripcion.trim() === ''){
        return res.status(400).json({ error: 'descripcion es obligatorio' });
    }

    if(!Number.isInteger(precio) || precio < 0){
        return res.status(400).json({ error: 'precio invalido, debe ser un entero >= 0' });
    }

    const producto = Producto.crear({nombre: nombre.trim(), descripcion: descripcion.trim(), precio});

    res.status(201).json(producto);

}