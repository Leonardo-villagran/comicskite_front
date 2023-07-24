import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../Context/Context";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify"; // Importar el toast
import "react-toastify/dist/ReactToastify.css"; // Estilos del toast
import "../assets/css/Producto.css";

//Importación de imágenes utilizadas para la generación de botón like.
import blanco from "../assets/img/iconos/corazon_blanco.png";
import rojo from "../assets/img/iconos/corazon_rojo.png";

// import decodeTokenPayload from '../services/services'

const base_url = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const Productos = ({ mensajeDeCarga }) => {
  // const token = localStorage.getItem("token");
  // const payload = decodeTokenPayload(token);
  const { carrito, setCarrito, productos, setProductos, buscar, setBuscar } =
    useContext(Context);
  const [loading, setLoading] = useState(true);

  const capturaBuscar = (e) => {
    setBuscar(e.target.value);
  };

  const filtro = productos.filter((producto) =>
    producto.nombre.toUpperCase().includes(buscar.toUpperCase())
  );

  useEffect(() => {
    const getTokenFromLocalStorage = localStorage.getItem("token");
    // Función para obtener el token de JWT almacenado en el navegador
    // Realizar la solicitud GET al backend con Axios
    axios
      .get(base_url + "/favoritos", {
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
  }, [setProductos]);

  const presionarboton = (id_producto) => {
    const getTokenFromLocalStorage = localStorage.getItem("token");
    //console.log(productos);

    const producto = productos.find((producto) => producto.id_producto === id_producto);

    if (!producto) {
      // If the product with the given id doesn't exist, return without doing anything
      return;
    }

    if (producto.likes) {
      producto.likes = false;

      // If the product is disliked, remove it from the productos array
      

      // Realizar la solicitud GET al backend con Axios
      axios
        .delete(base_url +`/dislikes/${id_producto}`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage}`, // Agregar el token en el encabezado con formato Bearer
          },
        })
        .then((response) => {
          // Actualizar el estado con la lista de productos obtenida del backend
          console.log(response.data.mensaje);
          // If the product is disliked, remove it from the productos array
          const updatedProductos = productos.filter((p) => p.id_producto !== id_producto);
          setProductos(updatedProductos);

        })
        .catch((error) => {
          console.error("Error al borrar el like:", error);
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

  const agregarAlCarrito = (id_producto) => {
    const producto = productos.find(
      (producto) => producto.id_producto === id_producto
    );

    if (producto) {
      if (carrito && carrito.length > 0) {
        const productoEnCarrito = carrito.find(
          (item) => item.id_producto === id_producto
        );
        if (productoEnCarrito) {
          toast.warning("Este cómic ya está en el carrito");
        } else {
          const nuevoProductoEnCarrito = {
            ...producto,
            cantidad: 1,
          };

          setCarrito((prevCarrito) => [...prevCarrito, nuevoProductoEnCarrito]);
          toast.success("Cómic agregado al carrito con éxito");
          console.log("Cómic agregado al carrito:", nuevoProductoEnCarrito);
        }
      } else {
        // Si el carrito está vacío, agregar el cómic directamente
        const nuevoProductoEnCarrito = {
          ...producto,
          cantidad: 1,
        };

        setCarrito([nuevoProductoEnCarrito]);

        toast.success("Cómic agregado al carrito con éxito");
        console.log("Cómic agregado al carrito:", nuevoProductoEnCarrito);
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} newestOnTop />
      {/* Mostrar "Cargando..." mientras los datos se están cargando */}
      {loading ? (
        <p style={{ color: "#ebca6d", textTransform: "uppercase" }}>
          {mensajeDeCarga}
        </p>
      ) : (
        // Renderizar los datos si la carga ha finalizado
        <>
          {productos.length === 0 ? (
            <p style={{ color: "#ebca6d", textTransform: "uppercase" }}>
              No hay favoritos
            </p>
          ) : (
            <div></div>
          )}
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
                    className="super_card container-fluid h-100"
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
                      <div className="heart px-3">
                        <img
                          onClick={() => presionarboton(producto.id_producto)}
                          src={producto.likes === false ? blanco : rojo}
                          alt="foto"
                        />
                      </div>
                      <Card.Title>{producto.nombre}</Card.Title>
                      <Card.Text>Número: {producto.numero}</Card.Text>
                      <Card.Text>Stock: {producto.stock}</Card.Text>
                      <Card.Text>Precio: ${producto.precio}</Card.Text>
                      <div className="w-100 justify-content-between">
                        <Link to={"/detalles/" + producto.id_producto}>
                          <Button
                            variant="dark"
                            className="m-1 mr-2 boton-personalizado-card"
                          >
                            Detalles
                          </Button>
                        </Link>
                        <Button
                          variant="dark"
                          className="m-1 mr-2 boton-personalizado-card"
                          onClick={() => agregarAlCarrito(producto.id_producto)}
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
        </>
      )}
    </div>
  );
};

export default Productos;
