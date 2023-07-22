import Navbar from "./NavbarJwt";
import Favoritos from "../components/Favoritos";
const FavoritosView = () => {

    return (
        <div>
            <Navbar />

            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <Favoritos />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritosView;
