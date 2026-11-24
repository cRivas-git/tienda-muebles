import {useRevalidator} from "react-router";

// Error de un loader con botón para volver a ejecutarlo
export function ErrorCarga({mensaje}: {mensaje: string | null}) {

    const revalidator = useRevalidator();
    const reintentando = revalidator.state === "loading";

    return (
        <div className="flex flex-col items-start gap-4">
            <p role="alert" className="mensaje-error">{mensaje}</p>
            <button className="btn" onClick={() => revalidator.revalidate()} disabled={reintentando}>
                {reintentando ? "Cargando..." : "Reintentar"}
            </button>
        </div>
    );
}
