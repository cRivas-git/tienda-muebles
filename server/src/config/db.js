import {DatabaseSync} from 'node:sqlite'
import path from 'node:path'

const db = new DatabaseSync(path.join(import.meta.dirname, '../../app.db'))

db.exec(`
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    precio INTEGER NOT NULL,
    estado TEXT NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO'))
);

CREATE TABLE IF NOT EXISTS usuarios(
    id TEXT PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE COLLATE NOCASE,
    contrasena TEXT NOT NULL,
    rol TEXT NOT NULL CHECK (rol IN ('ADMIN'))
);
`);

export default db;