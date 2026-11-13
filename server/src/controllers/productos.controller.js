import * as Producto from '../models/producto.model.js'


const ESTADOS = ['ACTIVO','INACTIVO'];

export function listar(req, res){

    const { estado } = req.query;

    if(estado === undefined){
        return res.json(Producto.obtenerTodos())
    }

    if(!ESTADOS.includes(estado)){
        return res.status(400).json({ msg:`Estado debe ser uno de: ${ESTADOS.join(', ')}` });
    }

    res.json(Producto.obtenerPorEstado(estado));
}


export function obtenerPorId(req, res){
    const producto = Producto.obtenerPorId(req.params.id);
    if(!producto){
        return res.status(404).json({ msg: 'Producto no existe'});
    }
    res.json(producto);
}

export function crear(req, res){
    const {nombre, descripcion, precio} = req.body ?? {};

    let errores = [];

    if(typeof nombre !== 'string' || nombre.trim() === ''){
        errores.push({campo: 'nombre', error: 'Nombre del producto es requerido'});
    }

    if(typeof descripcion !== 'string' || descripcion.trim() === ''){
        errores.push({campo: 'descripcion', error: 'Descripción del producto es requerido'});
    }

    if(!Number.isInteger(precio) || precio < 0){
        errores.push({campo: 'precio', error: 'Precio invalido, debe ser >= 0'});
    }

    if(errores.length > 0){
        return res.status(400).json({errores});
    }

    const producto = Producto.crear({nombre: nombre.trim(), descripcion: descripcion.trim(), precio});

    res.status(201).json(producto);

}

export function cambiarEstadoPorId(req, res){
    const producto = Producto.obtenerPorId(req.params.id);
    if(!producto){
        return res.status(404).json({ msg : 'Producto no existe'});
    }

    const nuevoEstado = producto.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    res.json(Producto.cambiarEstadoPorId(producto.id, nuevoEstado));
}


export function eliminarPorId(req, res){
    const producto = Producto.obtenerPorId(req.params.id);
    if(!producto){
        return res.status(404).json({ msg:'Producto no existe' });
    }
    Producto.eliminarPorId(producto.id);
    res.json({ msg: 'Producto eliminado', producto });
}