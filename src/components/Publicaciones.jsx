import { useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import { useContext } from "react";

// import decodeTokenPayload from '../services/services'

const Productos = () => {
    // const token = localStorage.getItem("token");
    // const payload = decodeTokenPayload(token);
    const { productos, setProductos } = useContext(Context);

    useEffect(() => {
        const getTokenFromLocalStorage = localStorage.getItem("token");
        // Función para obtener el token de JWT almacenado en el navegador
        // Realizar la solicitud GET al backend con Axios
        axios
            .get("http://localhost:3000/publicaciones", {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
                },
            })
            .then((response) => {
                // Actualizar el estado con la lista de productos obtenida del backend
                setProductos(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener la lista de productos:", error);
            });
    }, [setProductos]);


    return (


        <div> <Link to="/nuevo_producto">
            <Button style={{ backgroundColor: 'black', borderColor: '#ebca6d', color: '#ebca6d', fontSize: '14px' }} >Agregar Comic</Button>
        </Link>
            <div className="container">
                <div className="row">
                    {productos.map((producto) => (
                        <div
                            key={producto.id_producto}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
                        >
                            <Card
                                className="container-fluid h-100"
                                style={{
                                    backgroundColor: "#295b6fff",
                                    color: "#ebca6d",
                                    border: "1px solid white"
                                }}
                            >
                                <div className="container">
                                    <Card.Img
                                        variant="top"
                                        src={`img/productos/${producto.imagen_grande}`}
                                        style={{ maxHeight: "371px", maxWidth: "246px" }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{producto.nombre}</Card.Title>
                                    <Card.Text>Número: {producto.numero}</Card.Text>
                                    <Card.Text>Precio: ${producto.precio}</Card.Text>
                                    <div className="w-100 justify-content-between">
                                        <Link to={"/detalles/" + producto.id_producto}>
                                            <Button
                                                variant="primary"
                                                className="m-1 mr-2 text-uppercase"
                                                style={{
                                                    backgroundColor: "black",
                                                    borderColor: "#ebca6d",
                                                    color: "#ebca6d",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Detalles
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="primary"
                                            className="mr-2 text-uppercase"
                                            style={{
                                                backgroundColor: "black",
                                                borderColor: "#ebca6d",
                                                color: "#ebca6d",
                                                fontSize: "12px",
                                            }}
                                        >
                                            Editar contenido
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productos;
