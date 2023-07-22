import Navbar from "./NavbarJwt";
import Perfil from "../components/Perfil";


const PerfilView = () => {

    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <Perfil/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilView;