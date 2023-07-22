import Navbar from "./NavbarJwt";
import Carrito from "../components/Carrito";
const CarritoView = () => {

    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <Carrito />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarritoView;
