import {Link} from "react-router";

export default function Home(){
    return (
        <div className="flex flex-col items-start gap-6 rounded-lg bg-botella px-6 py-16 text-white sm:px-12 sm:py-24">
            <h1 className="text-4xl sm:text-6xl">Bienvenido</h1>
            <p className="max-w-md text-lg">Muebles para tu casa. Revisa los productos disponibles y sus precios.</p>
            <Link to="/productos" className="rounded-md bg-mostaza px-5 py-2.5 font-semibold text-tinta outline-white hover:bg-white">
                Ver productos
            </Link>
        </div>
    )
}
