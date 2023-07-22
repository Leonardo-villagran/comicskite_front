import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "../assets/css/Perfil.css";

const base_url = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

// eslint-disable-next-line react/prop-types
const Perfil = ({ mensajeDeCarga }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza 'TU_JWT_TOKEN' por el token JWT válido que tienes
    const getTokenFromLocalStorage = localStorage.getItem("token");
    axios
      .get(base_url + "/perfil", {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del perfil:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Mostrar "Cargando..." mientras los datos se están cargando */}
      {loading ? (
        <p style={{ color: "#ebca6d", textTransform: "uppercase" }}>{mensajeDeCarga}</p>
      ) : (
        // Renderizar los datos si la carga ha finalizado
        <>
            <Card
              className="cardDetail d-flex flex-row"
              style={{
                backgroundColor: "#295b6fff",
                color: "#ebca6d",
                border: "1px solid #295b6fff",
              }}
            >
              <div className="card-body table-perfil">
                <table className="container">
                  <tbody>
                    <tr className="tr-table">
                      <th>Nombre:</th>
                      <th>{userData?.nombre} {userData?.apellido}</th>
                    </tr>
                    <tr className="tr-table">
                      <td>E-mail:</td>
                      <td>{userData.email}</td>
                    </tr>
                    <tr className="tr-table">
                      <td>Dirección:</td>
                      <td>{userData.direccion}</td>
                    </tr>
                    <tr className="tr-table">
                      <td>Teléfono:</td>
                      <td>{userData.telefono}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
        </>)}
    </div>
  );
};

export default Perfil;
