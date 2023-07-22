import Navbar from "./NavbarJwt";
import OrdenDeCompra from "../components/OrdenesDeCompra";


const OrdenDeCompraView = () => {

    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <OrdenDeCompra/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdenDeCompraView;