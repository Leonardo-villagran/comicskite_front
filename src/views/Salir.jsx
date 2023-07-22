import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';
import Navbar from './NavbarJwt';

const Salir = () => {
    const navigate = useNavigate();
    const { setTokenContent } = useContext(Context);

    const handleSalir = () => {
        // Eliminar el token del localStorage y el estado global
        localStorage.removeItem('token');
        setTokenContent('');
        // Redirigir al usuario a la página de inicio
        navigate('/');
    };

    return (
        <div>
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <h3 style={{ color: '#ebca6d' }}>¿Estás seguro que deseas salir?</h3>
                        <button style={{ backgroundColor: 'black', borderColor: '#ebca6d', color: '#ebca6d', fontSize: '14px' }} onClick={handleSalir}>Salir</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Salir;