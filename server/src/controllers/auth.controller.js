import * as AuthService from '../services/auth.service.js';

const OPCIONES_COOKIE = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
}

export async function login(req, res){
    const {correo, contrasena} = req.body ?? {};
    if(!correo || !contrasena){
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios'});
    }

    const token = await AuthService.login(correo, contrasena);
    if(!token) return res.status(401).json({ msg: 'Credenciales inválidas' });

    res.cookie('token', token, OPCIONES_COOKIE);
    res.json({ msg: 'Login exitoso'})

}


export function logout(req, res){
    res.clearCookie('token', OPCIONES_COOKIE);
    res.json({ msg: 'Logout Exitoso' });
}