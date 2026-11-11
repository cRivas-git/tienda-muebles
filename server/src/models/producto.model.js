import db from '../config/db.js';

const findAll = db.prepare('SELECT * FROM productos');
const findById = db.prepare('SELECT * FROM productos WHERE id = ?');
const insert = db.prepare('INSERT INTO productos(nombre, descripcion, precio) VALUES (?, ?, ?)');

export function obtenerTodos(){
    return findAll.all();
}

export function obtenerPorId(id){
    return findById.get(id);
}

export function crear({nombre, descripcion,  precio}){
    const {lastInsertRowid} = insert.run(nombre, descripcion, precio);
    return obtenerPorId(lastInsertRowid) ;
}