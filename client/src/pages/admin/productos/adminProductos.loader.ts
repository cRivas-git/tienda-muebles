import type {Producto} from "../../../types/producto.ts";
import {obtenerProductos} from "../../../api/productos.api.ts";
import type {LoaderFunctionArgs} from "react-router";

export type Filtro = "ACTIVO" | "INACTIVO" | "TODOS";

export type AdmProductosLoaderData = {
    productos: Producto[];
    filtro: Filtro;
    error: string | null;
}

export async function adminProductosLoader({ request }: LoaderFunctionArgs): Promise<AdmProductosLoaderData>{
    const param = new URL(request.url).searchParams.get("estado");
    const filtro: Filtro = param === "INACTIVO" || param === "TODOS" ? param : "ACTIVO";

    try{
        const productos = await obtenerProductos(
            filtro === "TODOS" ? undefined : {estado: filtro}
        );
        return {productos, filtro, error: null};

    }catch{
        return {productos: [], filtro, error: "No se pudieron cargar los productos"}
    }

}