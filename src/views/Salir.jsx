import Navbar from './NavbarJwt';
import Salir from '../components/Salir';
const SalirView = () => {
    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <Salir mensaje={"¿Estás seguro que deseas salir?"}/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SalirView;