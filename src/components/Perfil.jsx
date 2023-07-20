import { useEffect, useState } from "react";
import axios from "axios";
import { Card} from "react-bootstrap";


const Perfil = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Reemplaza 'TU_JWT_TOKEN' por el token JWT válido que tienes
        const getTokenFromLocalStorage = localStorage.getItem("token");
        axios
            .get("http://localhost:3000/perfil", {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage}`,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos del perfil:", error);
            });
    }, []);

    return (
        <div>
            {userData ? (
                <Card
                    className="cardDetail d-flex flex-row"
                    style={{
                        backgroundColor: "#295b6fff",
                        color: "#ebca6d",
                        border: "1px solid white",
                    }}
                >
                    <div className="card-body">
                        <h5 className="card-title">Nombre: {userData.nombre}</h5>
                        <h5 className="card-title">Apellido: {userData.apellido}</h5>
                        <p className="card-text">E-mail: {userData.email}</p>
                        <p className="card-text">Dirección: {userData.direccion}</p>
                        <p className="card-text">Teléfono: {userData.telefono}</p>
                    </div>
                </Card>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Perfil;
