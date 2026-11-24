import {Link, useLoaderData, useRevalidator} from "react-router";
import type {AdmProductosLoaderData, Filtro} from "./adminProductos.loader.ts";
import {cambiarEstadoPorId} from "../../../api/productos.api.ts";
import {useState} from "react";
import {ErrorCarga} from "../../../components/errorCarga/ErrorCarga.tsx";
import {formatearPrecio} from "../../../utils/formato.ts";

const FILTROS: {valor: Filtro; texto: string}[] = [
    {valor: "ACTIVO", texto: "Activos"},
    {valor: "INACTIVO", texto: "Inactivos"},
    {valor: "TODOS", texto: "Todos"},
];

export function AdminProductos(){

    const { productos, filtro, error} = useLoaderData() as AdmProductosLoaderData;
    const revalidator = useRevalidator();

    // id del producto que se está cambiando, null si no hay ninguno
    const [idCambiando, setIdCambiando] = useState<number | null>(null);

    const handleCambiarEstado = async (id: number) => {

        try{
            setIdCambiando(id);
            await cambiarEstadoPorId(id);
            await revalidator.revalidate();
        }catch{
            alert("Error al cambiar estado del producto")
        }finally {
            setIdCambiando(null);
        }

    }


    if(error){
        return <ErrorCarga mensaje={error}/>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1>Productos</h1>
                <Link to="/admin/productos/crear" className="btn">Crear producto</Link>
            </div>

            <nav aria-label="Filtrar por estado" className="flex gap-2">
                {FILTROS.map(f => (
                    <Link
                        key={f.valor}
                        to={`?estado=${f.valor}`}
                        aria-current={f.valor === filtro ? "page" : undefined}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium ${f.valor === filtro ? "bg-botella text-white" : "bg-lino hover:bg-linea"}`}
                    >
                        {f.texto}
                    </Link>
                ))}
            </nav>

            {productos.length === 0 ? (
                <p>No hay productos en este filtro.</p>
            ) : (
                <ul className="divide-y divide-linea border-y border-linea">
                    {productos.map(p => (
                        <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                            <div className="min-w-0 flex-1 basis-64">
                                <p className="font-semibold wrap-break-word">
                                    {p.nombre}
                                    <span className={`ml-2 rounded px-2 py-0.5 text-xs font-medium ${p.estado === "ACTIVO" ? "bg-botella/10 text-botella" : "bg-mostaza/25 text-tinta"}`}>
                                        {p.estado === "ACTIVO" ? "Activo" : "Inactivo"}
                                    </span>
                                </p>
                                <p className="text-sm text-tinta/75 wrap-break-word">{p.descripcion}</p>
                            </div>
                            <span className="font-semibold tabular-nums">{formatearPrecio(p.precio)}</span>
                            <div className="flex gap-2">
                                <Link to={`/admin/productos/${p.id}/editar`} className="btn-secundario">Editar</Link>
                                <button
                                    className="btn-secundario"
                                    onClick={() => handleCambiarEstado(p.id)}
                                    disabled={idCambiando !== null}
                                >
                                    {idCambiando === p.id ? "Cargando..." : p.estado === "ACTIVO" ? "Desactivar" : "Activar"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
