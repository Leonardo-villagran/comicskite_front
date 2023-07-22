import Navbar from "./NavbarJwt";
import Publicaciones from "../components/Publicaciones";

const ProductosView = () => {

    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <Publicaciones mensajeDeCarga={"Cargando publicaciones..."} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductosView;
