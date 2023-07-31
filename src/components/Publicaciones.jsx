import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import { useContext } from "react";
import "../assets/css/Publicaciones.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatearNumeroConPunto } from "../utils/utilsNumbers";
import ProductosPaginator from "./PublicacionesPaginator";

// import decodeTokenPayload from '../services/services'
const base_url = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const Productos = ({ mensajeDeCarga }) => {
  // const token = localStorage.getItem("token");
  // const payload = decodeTokenPayload(token);
  const { PublicacionesPage, PublicacionesSize, productos, setProductos, buscar, setBuscar } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const capturaBuscar = (e) => {
    setBuscar(e.target.value);
  };

  const filtro = productos.filter((producto) =>
    producto.nombre.toUpperCase().includes(buscar.toUpperCase())
  );

  useEffect(() => {
    const getTokenFromLocalStorage = localStorage.getItem("token"); // Función para obtener el token de JWT almacenado en el navegador
    const comicAgregado = localStorage.getItem('ComicAgregado');
    console.log("Cómic Agregado: ", comicAgregado);
    if (comicAgregado === "true") {
      toast.success("Cómic agregado exitosamente. Ahora puede continuar.");
      localStorage.removeItem('ComicAgregado');
    }

    const comicEditado = localStorage.getItem('ComicEditado');
    console.log("Cómic Editado: ", comicEditado);
    if (comicEditado === "true") {
      toast.success("Comic Editado exitosamente. Ahora puede continuar.");
      localStorage.removeItem('ComicEditado');
    }

    // Realizar la solicitud GET al backend con Axios
    axios
      .get(base_url + "/publicaciones", {
        params: {
          page: PublicacionesPage,
          size: PublicacionesSize,
        },
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
        },
      })
      .then((response) => {
        // Actualizar el estado con la lista de productos obtenida del backend
        setProductos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos:", error);
        setLoading(false);
      });
  }, [setProductos,PublicacionesPage, PublicacionesSize]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} newestOnTop/>
      {loading ? (
        <p style={{ color: "#ebca6d", textTransform: "uppercase" }}>
          {mensajeDeCarga}
        </p>
      ) : (
        // Renderizar los datos si la carga ha finalizado
        <>
          <Link to="/nuevo_producto">
            <Button variant="dark" className="boton-personalizado-titulo">
              Agregar Comic
            </Button>
          </Link>
          <div className="container">
            <div className="form">
              <form>
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  className="m-2 search form-control"
                  value={buscar}
                  onChange={(e) => capturaBuscar(e)}
                />
              </form>
            </div>
            <div className="row">
              {filtro.map((producto) => (
                <div
                  key={producto.id_producto}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
                >
                  <Card
                    className="super_card_pub container-fluid h-100"
                    style={{
                      backgroundColor: "#295b6fff",
                      color: "#ebca6d",
                      border: "1px solid white",
                    }}
                  >
                    <div className="container">
                      <Card.Img
                        variant="top"
                        src={producto.imagen_grande}
                        style={{ maxHeight: "371px", maxWidth: "246px" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{producto.nombre}</Card.Title>
                      <Card.Text>Número: {formatearNumeroConPunto(producto.numero)}</Card.Text>
                      <Card.Text>Stock: {formatearNumeroConPunto(producto.stock)}</Card.Text>
                      <Card.Text>Precio: ${formatearNumeroConPunto(producto.precio)}</Card.Text>
                      <div className="w-100 justify-content-between">
                        <Link to={"/detalles/" + producto.id_producto}>
                          <Button
                            variant="dark"
                            className="m-1 mr-2 boton-personalizado-card"
                          >
                            Detalles
                          </Button>
                        </Link>
                        <Link to={"/editar_producto/" + producto.id_producto}>
                          <Button
                            variant="dark"
                            className="m-1 mr-2 boton-personalizado-card"
                          >
                            Editar contenido
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            <ProductosPaginator/>
          </div>
        </>
      )}
    </div>
  );
};

export default Productos;
