import { useContext, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Context from "../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/Carrito.css";

const base_url = import.meta.env.VITE_API_URL;

const Carrito = () => {

  const { carrito, setCarrito } = useContext(Context);
  const [detalleFinal, setDetalleFinal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const eliminarDelCarrito = (id_producto) => {
    const nuevosProductos = carrito.filter((producto) => producto.id_producto !== id_producto);
    setCarrito(nuevosProductos);
    toast.error("Producto eliminado del carrito");
  };

  const aumentarCantidad = (id_producto) => {
    const nuevosProductos = carrito.map((producto) => {
      if (producto.id_producto === id_producto) {
        return { ...producto, cantidad: producto.cantidad + 1 };
      }
      return producto;
    });
    setCarrito(nuevosProductos);
  };

  const disminuirCantidad = (id_producto) => {
    const nuevosProductos = carrito.map((producto) => {
      if (producto.id_producto === id_producto && producto.cantidad > 1) {
        return { ...producto, cantidad: producto.cantidad - 1 };
      }
      return producto;
    });
    setCarrito(nuevosProductos);
  };

  const getTotalPorProducto = (producto) => {
    return producto.precio * producto.cantidad;
  };

  const getTotalGeneral = () => {
    return carrito.reduce((total, producto) => total + getTotalPorProducto(producto), 0);
  };


  const procesarCarrito = () => {
    setIsProcessing(true); // Bloquear el botón al inicio de la solicitud
    // Aquí realizamos la solicitud POST al backend para procesar el carrito
    const getTokenFromLocalStorage = localStorage.getItem("token");
    const productosEnCarrito = carrito.map((producto) => ({
      id_producto: producto.id_producto,
      cantidad: producto.cantidad,
    }));

    axios.post(base_url + "/carrito",
      { detalle_productos: productosEnCarrito },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`,
        },
      })
      .then((response) => {
        // Si la solicitud es exitosa, limpiamos el carrito
        setCarrito([]);
        console.log(response.data);
        toast.success("Carrito procesado con éxito.");
        // Concatenamos los saltos de línea con "<br />" para mostrarlos correctamente en el navegador
        const detalleFinalConSaltosDeLinea = response.data.detalle_final.replace(/\n/g, "<br />");
        setDetalleFinal(detalleFinalConSaltosDeLinea);
        setIsProcessing(false);

      })
      .catch((error) => {
        console.error("Error al procesar el carrito:", error);
        toast.error("Error al procesar el carrito.");
      });
  };
  return (
    <div>
      {/* Mostrar "Cargando..." mientras los datos se están cargando */}
      <ToastContainer position="top-right" autoClose={1000} newestOnTop /><>
          {carrito.length===0 && !detalleFinal ? <div><p style={{ color: '#ebca6d', textTransform: 'uppercase' }} >El carrito está vacío</p></div>: <div></div>}</>

          {carrito.length === 0  ? (<div></div>) : (
            <div>
              <div className="card-body">
                <Table striped bordered hover className="gradient-table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Número</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((producto) => (
                      <tr key={producto.id_producto}  >
                        <td>
                          <img
                            src={producto.imagen_pequena}
                            alt={producto.nombre}
                            style={{ maxHeight: "50px", maxWidth: "50px" }}
                          />
                        </td>
                        <td>{producto.nombre}</td>
                        <td>{producto.numero}</td>
                        <td>{producto.precio}</td>
                        <td>
                          <Button variant="outline-primary" onClick={() => disminuirCantidad(producto.id_producto)}>-</Button>{" "}
                          {producto.cantidad}{" "}
                          <Button variant="outline-primary" onClick={() => aumentarCantidad(producto.id_producto)}>+</Button>
                        </td>
                        <td>{getTotalPorProducto(producto)}</td>
                        <td>
                          <Button variant="danger" onClick={() => eliminarDelCarrito(producto.id_producto)}>
                            Eliminar del carro
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div><h4 style={{
                backgroundColor: "black",
                color: "#ebca6d",
                fontSize: "24px",
              }}>Total general: ${getTotalGeneral()}</h4></div>
              <Button variant="primary"
                className="mr-2 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }} onClick={procesarCarrito}
                disabled={isProcessing} // Deshabilitar el botón mientras se está procesando
              >
                Procesar carrito
              </Button>
            </div>

          )}
          <div>
            {/* Utilizamos el componente <pre> para preservar los saltos de línea */}
            {detalleFinal.length === 0 ? (<div></div>) : (
              <p className="gradient-table " dangerouslySetInnerHTML={{ __html: detalleFinal }}></p>)
            }
          </div>
        
    </div>
  );
};

export default Carrito;