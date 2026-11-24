import {Link} from "react-router";

export function Admin(){
    return(
        <div className="flex flex-col gap-4">
            <h1>Administración</h1>
            <p>Crea, edita y activa los productos que se muestran en la tienda.</p>
            <div className="flex flex-wrap gap-3">
                <Link to="/admin/productos" className="btn">Ver productos</Link>
                <Link to="/admin/productos/crear" className="btn">Crear producto</Link>
            </div>
        </div>
    )
}
