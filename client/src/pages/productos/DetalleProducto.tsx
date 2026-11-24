import {Link, useLoaderData} from "react-router";
import type {ProductoLoader} from "./producto.loader.ts";
import {ErrorCarga} from "../../components/errorCarga/ErrorCarga.tsx";
import {formatearPrecio} from "../../utils/formato.ts";

export function DetalleProducto(){

    const {producto, error} = useLoaderData() as ProductoLoader;

    if(!producto){
        return <ErrorCarga mensaje={error}/>;
    }

    return(
        <div className="flex flex-col items-start gap-4">
            <Link to="/productos" className="text-sm underline underline-offset-4">Volver a productos</Link>
            <h1 className="wrap-anywhere">{producto.nombre}</h1>
            <p className="text-2xl font-semibold text-botella">{formatearPrecio(producto.precio)}</p>
            <p className="max-w-prose wrap-anywhere">{producto.descripcion}</p>
        </div>
    )
}
