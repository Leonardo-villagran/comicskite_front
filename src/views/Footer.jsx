import Badge from 'react-bootstrap/Badge';
import { Link, useLocation } from 'react-router-dom'; // Importar el componente Link
export default function FooterView() {
    const location = useLocation();
    return (
        <div style={{ color: '#ebca6d' }}>
            {location.pathname === '/' && (
                <Link to="/presentacion1">Presentación</Link>
            )}<br/>
                        {location.pathname === '/' && (
                <Link to="/final1">Final</Link>
            )}
            <p>Todos los derechos resevados 2023<br /><a href={`mailto:"contacto@comicskites.cl"`}><Badge bg="secondary p-2">contacto@comicskites.cl</Badge></a></p>
        </div>
    )
}
