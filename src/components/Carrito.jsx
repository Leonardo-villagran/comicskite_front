import { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Context from "../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(Context);

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
    // Aquí realizamos la solicitud POST al backend para procesar el carrito
    const getTokenFromLocalStorage = localStorage.getItem("token");
    const productosEnCarrito = carrito.map((producto) => ({
      id_producto: producto.id_producto,
      cantidad: producto.cantidad,
    }));

    axios.post("http://localhost:3000/carrito",
      { detalle_productos: productosEnCarrito },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`,
        },
      })
      .then((response) => {
        // Si la solicitud es exitosa, limpiamos el carrito
        setCarrito([]);
        console.log(response);
        toast.success("Carrito procesado con éxito.");
      })
      .catch((error) => {
        console.error("Error al procesar el carrito:", error);
        toast.error("Error al procesar el carrito.");
      });
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <h3 style={{ color: '#ebca6d', textTransform: 'uppercase' }}>Carrito de compras</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <Table striped bordered hover>
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
                <tr key={producto.id_producto}>
                  <td>
                    <img
                      src={`img/productos/${producto.imagen_pequena}`}
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
            }} onClick={procesarCarrito}>
            Procesar carrito
          </Button>
        </div>

      )}
    </div>
  );
};

export default Carrito;