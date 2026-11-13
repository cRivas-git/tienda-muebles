import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
    //req.headers.authorization viene 'Bearer adasdsadstoken' con split los separa y los asigna a los correspondientes tipo: Bearer y token: asdsasdatoken
    const [tipo, token] = (req.headers.authorization ?? '').split(' ');

    if(tipo !== 'Bearer' || !token){
        return res.status(401).json({ msg: 'Token requerido'})
    }

    try{
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next()
    }catch{
        return res.status(401).json({ msg: 'Token inválido o expirado'})
    }

}

export function protegerSiNoEsActivo(req, res, next){
    if(req.query.estado === 'ACTIVO'){
        return next();
    }
    return verificarToken(req, res, next);
}