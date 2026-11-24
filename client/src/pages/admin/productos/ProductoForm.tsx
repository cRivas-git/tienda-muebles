import {useState} from "react";
import type {CrearProductoDTO} from "../../../types/producto.ts";

type Props = {
    inicial: CrearProductoDTO;
    onGuardar: (producto: CrearProductoDTO) => Promise<void>;
}

export function ProductoForm({inicial, onGuardar}: Props) {

    const [producto, setProducto] = useState<CrearProductoDTO>(inicial);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setProducto({
            ...producto,
            [name]: type === "number" ? Number(value) : value
        });
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        try{
            await onGuardar(producto);
        }catch{
            setError("No se pudo guardar el producto");
        }finally{
            setCargando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
            {error && <p role="alert" className="mensaje-error">{error}</p>}
            <label className="etiqueta">
                Nombre
                <input className="campo" type="text" name="nombre" value={producto.nombre} onChange={handleChange} required/>
            </label>
            <label className="etiqueta">
                Descripción
                <input className="campo" type="text" name="descripcion" value={producto.descripcion} onChange={handleChange} required/>
            </label>
            <label className="etiqueta">
                Precio
                <input className="campo" type="number" name="precio" min={0} step={1} value={producto.precio} onChange={handleChange} required/>
            </label>
            <button type="submit" className="btn self-start" disabled={cargando}>
                {cargando ? "Guardando..." : "Guardar"}
            </button>
        </form>
    );
}
