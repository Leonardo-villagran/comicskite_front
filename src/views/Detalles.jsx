import Navbar from "./NavbarJwt";
import { useEffect } from "react";
import Context from '../Context/Context';
import { useContext } from 'react';
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import decodeTokenPayload from '../services/services'

const Detalles = () => {
  // const token = localStorage.getItem("token");
  // const payload = decodeTokenPayload(token);

  const { id_producto } = useParams();
  const { producto, setProducto } = useContext(Context);

  
  console.log("id_producto: ", id_producto)

  useEffect(() => {
    // Función para obtener el token de JWT almacenado en el navegador
    const getTokenFromLocalStorage = () => {
      return localStorage.getItem("token");
    };

    // Realizar la solicitud GET al backend con Axios
    axios
      .get(`http://localhost:3000/detalles/${id_producto}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Agregar el token en el encabezado con formato Bearer
        },
      })
      .then((response) => {
        // Actualizar el estado con la lista de productos obtenida del backend
        setProducto(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos:", error);
      });
  }, [setProducto, id_producto]);

  return (
    <div>
      <Navbar />

      <div style={{ backgroundColor: "#295b6fff", padding: "1rem" }}>
        <div style={{ backgroundColor: "black", padding: "1rem" }}>
          <div
            style={{
              backgroundColor: "#295b6fff",
              padding: "1rem",
              border: "1px solid white",
            }}
          >
            <div style={{ wordBreak: "break-all", color: "white" }}>
              {/* Renderiza el payload en la interfaz
                            {payload ? (
                                <pre> {payload.id_usuario}<br/>
                                    {payload.email}<br/>
                                    {payload.administrador}<br/></pre>
                            ) : (
                                <p>Token no válido o no disponible.</p>
                            )} */}
              {/*<img
                className="rounded-5 border border-white border-4"
                src="img/productos/d_grande01.jpg"
                alt="Imagen"
                          /> */}
              <div className="container mt-4">
                <div className="row">
                    <div key={producto.id_producto} className="col-12">
                      <Card>
                        <Card.Img variant="top" src={`img/productos/${producto.imagen_grande}`} />
                        <Card.Body>
                          <Card.Title>{producto.nombre}</Card.Title>
                          <Card.Text>Número: {producto.numero}</Card.Text>
                          <Card.Text>{producto.detalle}</Card.Text>
                          <Card.Text>Stock: {producto.stock}</Card.Text>
                          <Card.Text>Precio: ${producto.precio}</Card.Text>
                          <div className="w-100 justify-content-between">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
