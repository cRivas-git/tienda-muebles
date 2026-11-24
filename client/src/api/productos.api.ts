import {api} from "./client.ts";
import type { CrearProductoDTO, Producto} from "../types/producto.ts";

// al usar llaves {} en una arrow function necesito return sin llaves es un return implícito
export const obtenerProductos = (params?: {estado?:string}): Promise<Producto[]> =>
    api.get('/api/productos', {params}).then(r => r.data);

export const obtenerProductoPorId = (id: number, params?: {estado?: string}): Promise<Producto> =>
    api.get(`/api/productos/${id}`, {params}).then(r => r.data);

export const crearProducto = (data: CrearProductoDTO): Promise<Producto> =>
    api.post('/api/productos', data).then(r => r.data);

export const editarProducto = (id: number, data: CrearProductoDTO): Promise<Producto> =>
    api.put(`/api/productos/${id}`, data).then(r => r.data);

export const cambiarEstadoPorId = (id: number): Promise<Producto> =>
    api.patch(`/api/productos/${id}`).then(r => r.data);
