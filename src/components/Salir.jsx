import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';

// eslint-disable-next-line react/prop-types
const Salir = ({ mensaje }) => {
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
            <h3 className="titulo-personalizado">{mensaje}</h3>
            <button className="boton-personalizado-titulo" onClick={handleSalir}>Salir</button>
        </div>

    );
};

export default Salir;