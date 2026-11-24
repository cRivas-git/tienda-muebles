import {LoginAPI} from "../../api/usuarios.api.ts";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

export default function Login(){

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datos = new FormData(e.currentTarget);
        try{
            await LoginAPI({
                correo: String(datos.get('correo')),
                contrasena: String(datos.get('contrasena'))
            });
            navigate('/admin', {replace: true});
        }catch (e){
            if(axios.isAxiosError(e) && e.response?.status === 401 ){
                setError("Correo o contraseña incorrectos")
            }else{
                setError("No se pudo conectar con el servidor")
            }
        }

    }
    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-4">
            <h1>Iniciar sesión</h1>
            {error && <p role="alert" className="mensaje-error">{error}</p>}
            <label className="etiqueta">
                Correo electrónico
                <input className="campo" type="email" name="correo" autoComplete="username" required/>
            </label>
            <label className="etiqueta">
                Contraseña
                <input className="campo" type="password" name="contrasena" autoComplete="current-password" required/>
            </label>
            <button type="submit" className="btn">Iniciar sesión</button>
        </form>
    )
}