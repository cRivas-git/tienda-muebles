import type {Producto} from "../../types/producto.ts";
import {obtenerProductoPorId} from "../../api/productos.api.ts";
import {data, type LoaderFunctionArgs} from "react-router";
import axios from "axios";

export type ProductoLoader = {
    producto: Producto | null;
    error: string | null;
}

export async function productoLoader({params} : LoaderFunctionArgs): Promise<ProductoLoader>{
    const id = Number(params.id);
    try{
        return {producto: await obtenerProductoPorId(id, {estado: 'ACTIVO'}), error: null}
    }catch(e){
        if(axios.isAxiosError(e) && e.response?.status === 404){
            throw data("Producto no encontrado", {status: 404})
        }
        return {producto: null, error: "No se pudo cargar el producto"}
    }
}