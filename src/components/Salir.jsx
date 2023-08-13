import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';

// eslint-disable-next-line react/prop-types
const Salir = ({ mensaje }) => {
    const navigate = useNavigate();
    const { setTokenContent, 
            setOrdenesCompra, 
            setOrdenPage, 
            setOrdenSize, 
            setPublicacionesPage,
            setPublicacionesSize,
            setProductosPage,
            setProductosPageSize,
            setCarrito,
            setProducto,
            setProductos} = useContext(Context);

    const handleSalir = () => {
        // Eliminar el token del localStorage y el estado global
        localStorage.removeItem('token');
        setTokenContent('');
        
        setOrdenesCompra([]);

        setOrdenPage(1);
        setOrdenSize(4);

        setPublicacionesPage(1);
        setPublicacionesSize(8);

        setProductosPage(1);
        setProductosPageSize(8);

        setCarrito([]);
        setProducto([]);
        setProductos([]);

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