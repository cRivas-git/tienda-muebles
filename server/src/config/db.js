import {DatabaseSync} from 'node:sqlite'
import path from 'node:path'

const db = new DatabaseSync(path.join(import.meta.dirname, '../../app.db'))

db.exec(`
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    precio INTEGER NOT NULL,
    estado TEXT NOT NULL DEFAULT 'Activo'CHECK (estado IN ('Activo', 'Inactivo'))
)
`);

export default db;