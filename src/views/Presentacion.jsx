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
                                        <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fpresentacion%2Fhireline_logo_adl.png?alt=media&token=cc787e36-e269-4d06-9e33-0411560a9d04" alt="Imagen de ejemplo" className="img-fluid w-50 mb-2" />
                                            <p className="card-text" style={{ fontSize: "17px" }}>Grupo: 7</p>
                                            <p className="card-text" style={{ fontSize: "17px" }}>Generación: G27</p>
                                            <p className="card-text" style={{ fontSize: "17px" }}>Carrera: Full Stack Javascript</p>
                                            <p className="card-text" style={{ fontSize: "17px" }}>Presentación: Final</p>
                                            <p className="card-text" style={{ fontSize: "17px" }}>Tema: Comicskites – Venta de comics de colección a través de internet</p>
                                            <p className="card-text" style={{ fontSize: "17px" }}>Integrantes:</p>
                                            <ul className="list-unstyled" style={{ fontSize: "17px" }}>
                                            <li>&nbsp;&nbsp;&nbsp;<i className="fas fa-user"></i> Lorenzo Chacano</li>
                                            <li>&nbsp;&nbsp;&nbsp;<i className="fas fa-user"></i> Paolo Landeros</li>
                                            <li>&nbsp;&nbsp;&nbsp;<i className="fas fa-user"></i> Leonardo Villagrán</li>
</ul>
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <Card
                                        className="super_card h-100"
                                        style={{
                                            backgroundColor: "#295b6fff",
                                            color: "#90b043",
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








