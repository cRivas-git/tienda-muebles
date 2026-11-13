import db from '../config/db.js'

const findAll = db.prepare('SELECT * FROM usuarios');
const findById = db.prepare('SELECT * FROM usuarios WHERE id = ?');
const findByCorreo = db.prepare('SELECT * FROM usuarios WHERE correo = ?');


export function obtenerTodos(){
    return findAll.all();
}

export function obtenerPorId(id){
    return findById.get(id);
}

export function obtenerPorCorreo(correo){
    return findByCorreo.get(correo);
}

