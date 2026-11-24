import {Link} from "react-router";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <h1>404 - Página no encontrada</h1>
            <p>La dirección no existe o el contenido ya no está disponible.</p>
            <Link to="/" className="btn">Volver al inicio</Link>
        </div>
    );
};

