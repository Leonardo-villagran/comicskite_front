import { Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarButtons() {
    return (
        <Nav className="w-100 justify-content-between">


            <Link to="/productos">
                <Button
                    variant="primary"
                    className="mr-2 text-uppercase"
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#ebca6d',
                        color: '#ebca6d',
                        fontSize: '12px',
                    }}
                >
                    Productos
                </Button>
            </Link>
            <Link to="/publicaciones">
                <Button
                    variant="primary"
                    className="mr-2 text-uppercase"
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#ebca6d',
                        color: '#ebca6d',
                        fontSize: '12px',
                    }}
                >
                    Publicaciones
                </Button>
            </Link>
            <Link to="/favoritos">
                <Button
                    variant="primary"
                    className="mr-2 text-uppercase"
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#ebca6d',
                        color: '#ebca6d',
                        fontSize: '12px',
                    }}
                >
                    Mis Favoritos
                </Button>
            </Link>
            <Link to="/perfil">
                <Button
                    variant="primary"
                    className="mr-2 text-uppercase"
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#ebca6d',
                        color: '#ebca6d',
                        fontSize: '12px',
                    }}
                >
                    Perfil
                </Button>
            </Link>
            <Link to="/carro_compras">
                <Button
                    variant="primary"
                    className="mr-2 text-uppercase"
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#ebca6d',
                        color: '#ebca6d',
                        fontSize: '12px',
                    }}
                >
                    Carro de Compras
                </Button>
            </Link>
            <Link to="/salir">
                <Button
                    variant="primary"
                    className="text-uppercase"
                    style={{
                        backgroundColor: 'black',
                        borderColor: '#ebca6d',
                        color: '#ebca6d',
                        fontSize: '12px',
                    }}
                >
                    Salir
                </Button>
            </Link>
        </Nav>
    );
}
