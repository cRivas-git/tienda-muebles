import {useNavigate} from "react-router";
import type {CrearProductoDTO} from "../../../types/producto.ts";
import {crearProducto} from "../../../api/productos.api.ts";
import {ProductoForm} from "./ProductoForm.tsx";

const PRODUCTO_VACIO: CrearProductoDTO = { nombre: "", descripcion: "", precio: 0 };

export default function CrearProducto() {

    const navigate = useNavigate();

    const handleGuardar = async (producto: CrearProductoDTO) => {
        await crearProducto(producto);
        await navigate("/admin/productos");
    };

    return (
        <div className="flex flex-col gap-6">
            <h1>Crear producto</h1>
            <ProductoForm inicial={PRODUCTO_VACIO} onGuardar={handleGuardar}/>
        </div>
    );
}
