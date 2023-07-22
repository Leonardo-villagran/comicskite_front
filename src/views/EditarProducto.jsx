import Navbar from "./NavbarJwt";
import EditarProducto from "../components/EditarProducto";

const EditarPRoductoView = () => {

    return (
        <div>
            <Navbar />

            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <EditarProducto />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarPRoductoView;