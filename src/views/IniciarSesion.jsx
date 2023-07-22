import IniciarSesion from "../components/IniciarSesion";
import Navbar from "./Navbar";

export default function Iniciar() {
    return (
        <div>
            <Navbar />

            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">

                        <IniciarSesion />
                    </div>
                </div>
            </div>
        </div>

    )
}
