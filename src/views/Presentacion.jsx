import Navbar from './Navbar';
import "../assets/css/Main.css";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom'; // Importar el componente Link
import { BsArrowRight } from 'react-icons/bs';

function Presentacion1() {
    return (
        <div className="App">
            <Navbar />
            <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <Card
                                        className="super_card h-100"
                                        style={{
                                            backgroundColor: "#295b6fff",
                                            color: "#ebca6d",
                                            border: "1px solid white",
                                        }}
                                    >
                                        <div className="card-body" style={{ textAlign: "left" }}>
                                            <h2 className="card-title">Grupo: 7</h2>
                                            <p className="card-text">Generación: G27</p>
                                            <p className="card-text">Carrera: Fullstack Javascript</p>
                                            <p className="card-text">Presentación: Final</p>
                                            <p className="card-text">Tema: Comicskites – Venta de comics de colección a través de internet</p>
                                            <p className="card-text">Integrantes:</p>
                                            <ul>
                                                <li>Lorenzo Chacano</li>
                                                <li>Paolo Landeros</li>
                                                <li>Leonardo Villagrán</li>
                                            </ul>
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <Card
                                        className="super_card h-100"
                                        style={{
                                            backgroundColor: "#295b6fff",
                                            color: "#ebca6d",
                                            border: "1px solid white",
                                        }}
                                    >
                                        <div className="card-body text-center">
                                            <h2 className="card-title">Venta de comics de colección</h2>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2FComics.jpg?alt=media&token=3929c4fe-911e-44c3-8d82-97b7dba2a240" alt="Imagen de ejemplo" className="img-fluid " />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col-12 text-center">
                                <Link to="/presentacion2" className="boton-personalizado-titulo"
                                    style={{
                                        border: "1px solid white",
                                        padding: "10px"
                                    }}>
                                    Continuar <BsArrowRight style={{
                                        fontSize: "30px"
                                    }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Presentacion1;








