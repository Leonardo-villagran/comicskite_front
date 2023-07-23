import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const base_url = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const OrdenesCompra = ({ mensajeDeCarga }) => {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerOrdenesCompra = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(base_url + '/orden_compras', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrdenesCompra(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes de compra:', error);
        setIsLoading(false);
      }
    };

    obtenerOrdenesCompra();
  }, []);

  const formatearFechaLatino = (fecha) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  };

  const handleEstadoChange = (event, orderId) => {
    const newState = [...ordenesCompra];
    const index = newState.findIndex((orden) => orden.id_orden_compra === orderId);
    newState[index].id_estado = parseInt(event.target.value);
    setOrdenesCompra(newState);
  };

  const handleSubmit = async (event, orderId) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const estadoToUpdate = ordenesCompra.find((orden) => orden.id_orden_compra === orderId);
      const response = await axios.put(
        base_url + '/estado',
        { id_orden_compra: orderId, id_estado: estadoToUpdate.id_estado },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedOrdenesCompra = [...ordenesCompra];
      const index = updatedOrdenesCompra.findIndex((orden) => orden.id_orden_compra === orderId);
      updatedOrdenesCompra[index].id_estado = response.data.nuevo_id_estado;
      setOrdenesCompra(updatedOrdenesCompra);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  console.log(ordenesCompra);
  return (
    <div className="container">
      {isLoading ? (
        <p style={{ color: '#ebca6d', textTransform: 'uppercase' }}>{mensajeDeCarga}</p>
      ) : (
        <div>
          <div className="row">
            {ordenesCompra.map((orden) => (
              <div className="col-12 m-2" key={orden.id_orden_compra}>
                <div
                  className="card d-flex"
                  style={{
                    backgroundColor: '#09232d',
                    color: '#ebca6d',
                    border: '1px solid white',
                    textAlign: 'left',
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Orden de Compra #{orden.id_orden_compra}</h5>
                    <p className="card-text">Fecha: {formatearFechaLatino(orden.fecha_venta)}</p>
                    <pre>{orden.detalle_productos}</pre>
                    <p className="card-text">
                      Estado: <span style={{ color: 'white' }}>{orden.estado}</span>
                    </p>
                    <div>
                      <form onSubmit={(event) => handleSubmit(event, orden.id_orden_compra)}>
                        <div className="form-group">
                          <select
                            className="form-control"
                            value={orden.id_estado}
                            onChange={(event) => handleEstadoChange(event, orden.id_orden_compra)}
                          >
                            <option value="1">No procesado</option>
                            <option value="2">Con problemas</option>
                            <option value="3">En traslado</option>
                            <option value="4">Entregado</option>
                            <option value="5">Eliminado</option>
                          </select>
                        </div>
                        <Button variant="dark" className="m-1 mr-2 boton-personalizado-card" type="submit">
                          Cambiar Estado
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenesCompra;