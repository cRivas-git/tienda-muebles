import {data, type LoaderFunctionArgs} from "react-router";
import type {ProductoLoader} from "../../productos/producto.loader.ts";
import {obtenerProductoPorId} from "../../../api/productos.api.ts";
import axios from "axios";

export async function editarProductoLoader({params}: LoaderFunctionArgs): Promise<ProductoLoader>{
    const id = Number(params.id);

    try{
        return {producto: await obtenerProductoPorId(id), error: null}
    }catch (e) {
        if(axios.isAxiosError(e) && e.response?.status === 404) {
            throw data("Producto no encontrado", {status: 404});
        }
        return {producto: null, error: "No se pudo cargar el producto"};
    }
}
