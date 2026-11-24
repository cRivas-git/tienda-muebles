import {Link, useLoaderData} from "react-router";
import type {ProductosLoaderData} from "./productos.loader.ts";
import {ErrorCarga} from "../../components/errorCarga/ErrorCarga.tsx";
import {formatearPrecio} from "../../utils/formato.ts";

export const Productos = () => {

    const { productos, error } = useLoaderData() as ProductosLoaderData;

    if(error){
        return <ErrorCarga mensaje={error}/>;
    }

    return (
        <div className="flex flex-col gap-6">
            <h1>Productos</h1>
            {productos.length === 0 ? (
                <p>No hay productos disponibles por ahora.</p>
            ) : (
                <ul className="divide-y divide-linea border-y border-linea">
                    {productos.map(p => (
                        <li key={p.id}>
                            <Link to={`/productos/${p.id}`} className="flex items-baseline justify-between gap-6 px-2 py-4 hover:bg-lino">
                                <span className="min-w-0">
                                    <span className="block text-lg font-semibold wrap-anywhere">{p.nombre}</span>
                                    <span className="block text-tinta/75 wrap-anywhere">{p.descripcion}</span>
                                </span>
                                <span className="text-lg font-semibold tabular-nums text-botella">{formatearPrecio(p.precio)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
