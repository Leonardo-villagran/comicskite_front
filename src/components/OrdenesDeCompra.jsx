import { useState, useEffect } from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import "../assets/css/OrdenesDeCompra.css";

const base_url = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const OrdenesCompra = ({ mensajeDeCarga }) => {
  const [estados, setEstados] = useState([]);
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const obtenerEstados = async (token) => {
    try {
      const response = await axios.get(base_url + '/estados', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener estados:', error);
      return [];
    }
  };

  const obtenerOrdenesCompra = async (token) => {
    try {
      const response = await axios.get(base_url + '/orden_compras', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener órdenes de compra:', error);
      return [];
    }
  };

  useEffect(() => {
    // Obtener estados y órdenes de compra cuando el componente se monta
    obtenerEstados(token)
      .then((estadosData) => setEstados(estadosData))
      .catch((error) => console.error(error));

    obtenerOrdenesCompra(token)
      .then((ordenesData) => {
        setOrdenesCompra(ordenesData)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error)
        setLoading(false);
      });
  }, [token]);

  const cambiarEstadoOrdenCompra = async (id_orden_compra, id_estado_nuevo) => {
    try {
      const response = await axios.put(
        base_url + '/estado',
        {
          id_orden_compra: id_orden_compra,
          id_estado: id_estado_nuevo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si el servidor responde con éxito, actualizamos el estado de la orden de compra localmente
      // Aquí asumimos que el servidor responde con los datos actualizados de la orden de compra
      const ordenActualizada = response.data;

      setOrdenesCompra((ordenes) =>
        ordenes.map((orden) =>
          orden.id_orden_compra === ordenActualizada.id_orden_compra ? ordenActualizada : orden
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado de la orden de compra:', error);
    }
  };

  const formatearFechaLatino = (fecha) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  };


  // Función para imprimir el mensaje si el estado está vacío
  const imprimirMensajeSiVacio = () => {
    if (ordenesCompra.length === 0) {
      return <p style={{ color: '#ebca6d', textTransform: 'uppercase' }}>no existen órdenes de compra</p>;
    }
  };

  // Función para obtener la clase de color del badge según el nombre del estado
  const obtenerClaseBadgePorEstado = (nombreEstado) => {
    const estadoClases = {
      'No procesado':'secondary', 
      'Pendiente': 'warning',
      'En traslado': 'info',
      'Entregado': 'success',
      'Cancelado': 'danger',
    };
    console.log(estadoClases[nombreEstado]);
    return estadoClases[nombreEstado] || 'badge badge-secondary'; // Color por defecto si el estado no coincide
  };

  console.log(ordenesCompra);
  return (
    <div className="container">
      {/* Mostrar "Cargando..." mientras los datos se están cargando */}
      {loading ? (
        <p style={{ color: "#ebca6d", textTransform: "uppercase" }}>{mensajeDeCarga}</p>
      ) : (<>
        {imprimirMensajeSiVacio()}
        {ordenesCompra.map((orden) => (
          <>
            <div  key={orden.id_orden_compra}
              className="card d-flex mb-2"
              style={{
                backgroundColor: '#09232d',
                color: '#ebca6d',
                border: '1px solid white',
                textAlign: 'left',
              }}
            >
            
                <h5 className="card-title">Orden de compra: {orden.id_orden_compra}</h5>
                <p className="card-text"> <Badge className="badge-custom" bg={obtenerClaseBadgePorEstado(orden.estado)}>
                  {orden.estado}
                </Badge></p>
                <p className="card-text">Fecha: {formatearFechaLatino(orden.fecha_venta)}</p>
                <pre>{orden.detalle_productos}</pre>
                <select style={{ fontSize: '14px', padding: '4px', width: '150px' }}
                  defaultValue={orden.id_estado} // Establecer el valor del select como el id_estado actual
                  value={orden.estado.id_estado}
                  onChange={(e) => cambiarEstadoOrdenCompra(orden.id_orden_compra, e.target.value)}
                >
                  {estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.id_estado}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
            </div>
          </>
        ))}

      </>)}
    </div>
  );
};

export default OrdenesCompra;