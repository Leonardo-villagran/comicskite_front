import Navbar from "./NavbarJwt";
import { useState,useEffect} from 'react';
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";


const ruta ='http://localhost:5173/public/';

//Importación de imágenes utilizadas para la generación de botón like.
import blanco from "../assets/img/iconos/corazon_blanco.png";
import rojo from "../assets/img/iconos/corazon_rojo.png";
// import decodeTokenPayload from '../services/services'

const Detalles = () => {
  // const token = localStorage.getItem("token");
  // const payload = decodeTokenPayload(token);

  const { id_producto } = useParams();
  const [producto, setProducto] = useState([]);

  //console.log("id_producto: ", id_producto)

  useEffect(() => {
    // Función para obtener el token de JWT almacenado en el navegador
    const getTokenFromLocalStorage = localStorage.getItem("token");

    // Realizar la solicitud GET al backend con Axios
    axios
      .get(`http://localhost:3000/detalles/${id_producto}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
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

  const presionarboton = (id_producto) => {
    const getTokenFromLocalStorage = localStorage.getItem("token");
    //console.log(productos);
    
    let producto_solo={...producto};
    
    if (producto_solo.likes){
      producto_solo.likes=false
      

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
      })
      .catch((error) => {
        console.error("Error al borrar el like:", error);
      });

    }else{ 
      producto_solo.likes=true;
      
      // Realizar la solicitud GET al backend con Axios
      axios
      .post(`http://localhost:3000/likes/${id_producto}`,null, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
        },
      })
      .then((response) => {
        // Actualizar el estado con la lista de productos obtenida del backend
        console.log(response.data.mensaje);
      })
      .catch((error) => {
        console.error("Error al agregar el like:", error);
      });
    } 
    // Actualizar el estado 'productos' con el nuevo array generado
    setProducto(producto_solo);
    console.log(producto);
  }
  
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
                        <Card.Img variant="top" src={ruta+"img/productos/"+producto.imagen_grande} style={{width: "20%"}}/>
                        <Card.Body> 

              <div className='heart px-2'><img onClick={() => presionarboton(producto.id_producto)} src={producto.likes === false ? blanco: rojo} alt="foto"/></div>

                          <Card.Title>{producto.nombre}</Card.Title>
                          <Card.Text>Número: {producto.numero}</Card.Text>
                          <Card.Text>{producto.detalle}</Card.Text>
                          <Card.Text>Stock: {producto.stock}</Card.Text>
                          <Card.Text>Precio: ${producto.precio}</Card.Text>
                          <div className="w-100 justify-content-between">
                    
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
