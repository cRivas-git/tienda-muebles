import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Usuario from "../models/usuario.model.js";


export async function login(correo, contrasena){
    const usuario = Usuario.obtenerPorCorreo(correo);
    const ok = usuario && await bcrypt.compare(contrasena, usuario.contrasena);
    if(!ok) return null;

    return jwt.sign({id:usuario.id, rol: usuario.rol}, process.env.JWT_SECRET, {expiresIn: '1h'});
}


