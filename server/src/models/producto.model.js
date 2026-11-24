import db from '../config/db.js';

const findAll = db.prepare('SELECT * FROM productos');
const findByEstado = db.prepare('SELECT * FROM productos WHERE estado = ?');
const findById = db.prepare('SELECT * FROM productos WHERE id = ?');
const insert = db.prepare('INSERT INTO productos(nombre, descripcion, precio) VALUES (?, ?, ?)');
const updateById = db.prepare('UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?');
const updateEstadoById = db.prepare('UPDATE productos SET estado = ? WHERE id = ?');
const deleteById = db.prepare('DELETE FROM productos WHERE id = ?');

export function obtenerTodos(){
    return findAll.all();
}

export function obtenerPorEstado(estado){
    return findByEstado.all(estado);
}

export function obtenerPorId(id){
    return findById.get(id);
}

export function crear({nombre, descripcion,  precio}){
    const {lastInsertRowid} = insert.run(nombre, descripcion, precio);
    return obtenerPorId(lastInsertRowid) ;
}

export function actualizarPorId({nombre, descripcion, precio, id}){
    const { changes } = updateById.run(nombre, descripcion, precio, id);
    return changes > 0 ? obtenerPorId(id) : null;
}

export function cambiarEstadoPorId(id, estado){
    const { changes } = updateEstadoById.run(estado, id);
    return changes > 0 ? obtenerPorId(id) : null;
}

export function eliminarPorId(id){
    const { changes } = deleteById.run(id);
    return changes > 0;
}