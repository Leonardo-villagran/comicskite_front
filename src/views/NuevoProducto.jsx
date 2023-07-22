import Navbar from "./NavbarJwt";
import NuevoProducto from "../components/NuevoProducto";

const NuevoPRoductoView = () => {

    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <NuevoProducto />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoPRoductoView;