import { useState, useEffect } from 'react';
import axios from 'axios';

const base_url= import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const OrdenesCompra = () => {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Función para obtener las órdenes de compra desde el backend
    const obtenerOrdenesCompra = async () => {
      try {
        // Obtener el token JWT almacenado en localStorage (asegúrate de que esté correctamente almacenado)
        const token = localStorage.getItem('token');

        // Realizar la solicitud GET al backend para obtener las órdenes de compra
        const response = await axios.get(base_url+'/orden_compras', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Almacenar las órdenes de compra en el estado y marcar la carga como completa
        setOrdenesCompra(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las órdenes de compra:', error);
        setIsLoading(false);
      }
    };

    // Llamar a la función para obtener las órdenes de compra desde el backend
    obtenerOrdenesCompra();
  }, []);

  // Función para formatear la fecha en formato latino (dd/mm/aaaa)
  const formatearFechaLatino = (fecha) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  };


  return (
    <div className="container">
      {isLoading ? (
        <p style={{ color: '#ebca6d' , textTransform: "uppercase"}}>Cargando órdenes de compra...</p>
      ) : (
        <div>
          <div className="row">
            {ordenesCompra.map((orden) => (
              <div className="col-12 m-2 " key={orden.id_orden_compra}>
                <div className="card d-flex "   style={{
                backgroundColor: "#09232d",
                color: "#ebca6d",
                border: "1px solid white",
                textAlign: "left"
              }} >
                  <div className="card-body">
                    <h5 className="card-title ">Orden de Compra #{orden.id_orden_compra}</h5>
                    <p className="card-text">Fecha: {formatearFechaLatino(orden.fecha_venta)}</p>
                    <pre>{orden.detalle_productos}</pre>
                    {/* Agrega aquí más detalles de la orden de compra si los tienes */}
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