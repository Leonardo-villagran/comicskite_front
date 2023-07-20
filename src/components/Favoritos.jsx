import { useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import { useContext } from "react";

//Importación de imágenes utilizadas para la generación de botón like.
import blanco from "../assets/img/iconos/corazon_blanco.png";
import rojo from "../assets/img/iconos/corazon_rojo.png";

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
            .get("http://localhost:3000/favoritos", {
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

    const presionarboton = (id_producto) => {
        const getTokenFromLocalStorage = localStorage.getItem("token");
        //console.log(productos);

        const producto = productos.find(
            (producto) => producto.id_producto === id_producto
        );

        if (producto.likes) {
            producto.likes = false;

            // Realizar la solicitud GET al backend con Axios
            axios
                .delete(`http://localhost:3000/dislikes/${id_producto}`, {
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
                    },
                })
                .then((response) => {
                    // Actualizar el estado con la lista de productos obtenida del backend
                    console.log(response.data.mensaje);

                    // Eliminar el producto de la lista 'productos' en el frontend
                    const nuevosProductos = productos.filter((producto) => producto.id_producto !== id_producto);
                    setProductos(nuevosProductos);

                })
                .catch((error) => {
                    console.error("Error al borrar el like:", error);
                });
        } else {
            producto.likes = true;

            // Realizar la solicitud GET al backend con Axios
            axios
                .post(`http://localhost:3000/likes/${id_producto}`, null, {
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
                    },
                })
                .then((response) => {
                    // Actualizar el estado con la lista de productos obtenida del backend
                    console.log(response.data.mensaje);

                    // Eliminar el producto de la lista 'productos' en el frontend
                    const nuevosProductos = productos.filter((producto) => producto.id_producto !== id_producto);
                    setProductos(nuevosProductos);

                })
                .catch((error) => {
                    console.error("Error al agregar el like:", error);
                });
        }

        //console.log(producto);

        // Encontrar el índice del producto antiguo
        const indiceProductoAntiguo = productos.findIndex(
            (producto) => producto.id_producto === id_producto
        );

        if (indiceProductoAntiguo !== -1) {
            // Crear un nuevo array de productos con el producto modificado
            const nuevosProductos = [...productos];
            nuevosProductos[indiceProductoAntiguo] = producto;

            // Actualizar el estado 'productos' con el nuevo array generado
            setProductos(nuevosProductos);
            //console.log(nuevosProductos);
        }
    };

    return (
        <div>
            {productos.length===0 ? <h3 style={{ color: '#ebca6d' , textTransform: 'uppercase'}}>No hay favoritos</h3>:<div></div>}
            {productos ? (
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
                                        <div className="heart px-3">
                                            <img
                                                onClick={() => presionarboton(producto.id_producto)}
                                                src={producto.likes === false ? blanco : rojo}
                                                alt="foto"
                                            />
                                        </div>
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
                                                Agregar al carro
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Productos;
