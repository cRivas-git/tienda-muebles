import {obtenerProductos} from "../../api/productos.api.ts";
import type {Producto} from "../../types/producto.ts";

export type ProductosLoaderData = {
    productos: Producto[];
    error: string | null;
}

export async function productosLoader(): Promise<ProductosLoaderData>{
    try{
        return { productos: await obtenerProductos({estado: 'ACTIVO'}), error: null };
    }catch{
        return { productos: [], error: "No se pudieron cargar los productos"};
    }

}

