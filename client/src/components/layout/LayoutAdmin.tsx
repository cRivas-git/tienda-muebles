import {useState} from "react";
import {NavLink, Outlet, useNavigate} from "react-router";
import {LogoutAPI} from "../../api/usuarios.api.ts";

const ENLACES = [
    {to: "/admin", texto: "Inicio"},
    {to: "/admin/productos", texto: "Productos"},
    {to: "/admin/productos/crear", texto: "Crear producto"},
];

export function LayoutAdmin() {

    const navigate = useNavigate();
    const [cerrando, setCerrando] = useState(false);
    const [error, setError] = useState("");

    const handleLogout = async () => {
        setCerrando(true);
        setError("");
        try{
            await LogoutAPI();
            await navigate("/lgn", {replace: true});
        }catch{
            setError("No se pudo cerrar la sesión");
        }finally{
            setCerrando(false);
        }
    };

    return (
        <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-md bg-lino px-4 py-3">
                <nav aria-label="Administración" className="flex flex-wrap gap-x-6 gap-y-2">
                    {ENLACES.map(e => (
                        <NavLink
                            key={e.to}
                            to={e.to}
                            end
                            className={({isActive}) => isActive ? "font-semibold text-botella underline underline-offset-4" : "hover:underline"}
                        >
                            {e.texto}
                        </NavLink>
                    ))}
                </nav>
                <button className="btn-secundario bg-white" onClick={handleLogout} disabled={cerrando}>
                    {cerrando ? "Cerrando..." : "Cerrar sesión"}
                </button>
            </div>
            {error && <p role="alert" className="mensaje-error mb-6">{error}</p>}
            <Outlet/>
        </>
    );
}
