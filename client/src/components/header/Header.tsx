import {Link, NavLink} from "react-router";

export function Header() {
    return (
        <header className="border-b border-linea">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
                <Link to="/" className="text-lg font-bold text-botella">Tienda de muebles</Link>
                <nav>
                    <NavLink
                        to="/productos"
                        className={({isActive}) => isActive ? "font-semibold text-botella underline underline-offset-4" : "hover:underline"}
                    >
                        Productos
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
