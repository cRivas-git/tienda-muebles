import {useLoaderData, useNavigate} from "react-router";
import type {CrearProductoDTO} from "../../../types/producto.ts";
import type {ProductoLoader} from "../../productos/producto.loader.ts";
import {editarProducto} from "../../../api/productos.api.ts";
import {ErrorCarga} from "../../../components/errorCarga/ErrorCarga.tsx";
import {ProductoForm} from "./ProductoForm.tsx";

export function EditarProducto() {

    const { producto, error } = useLoaderData() as ProductoLoader;
    const navigate = useNavigate();

    if(!producto){
        return <ErrorCarga mensaje={error}/>;
    }

    const { id, nombre, descripcion, precio } = producto;

    const handleGuardar = async (cambios: CrearProductoDTO) => {
        await editarProducto(id, cambios);
        await navigate("/admin/productos");
    };

    // key reinicia el formulario si se pasa de editar un producto a otro
    return (
        <div className="flex flex-col gap-6">
            <h1>Editar producto</h1>
            <ProductoForm key={id} inicial={{ nombre, descripcion, precio }} onGuardar={handleGuardar}/>
        </div>
    );
}
