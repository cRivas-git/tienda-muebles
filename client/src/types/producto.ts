export interface Producto{
    id:number;
    nombre: string;
    descripcion: string;
    precio: number;
    estado: 'ACTIVO' | 'INACTIVO';
}

export type CrearProductoDTO = Pick<Producto, 'nombre'| 'descripcion' | 'precio'>;