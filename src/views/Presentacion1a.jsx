import Navbar from './Navbar';
import "../assets/css/Main.css";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom'; // Importar el componente Link
import { BsArrowRight } from 'react-icons/bs';

function App() {
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
                                            color: "#90b043",
                                            border: "1px solid white",
                                        }}
                                    >
                                        <div className="card-body text-center">
                                            <h2 className="card-title">Coleccionistas</h2>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fpresentacion%2Fcoleccionistas_01.png?alt=media&token=73f29f53-f74c-4bff-b448-cba37ca7f3e2" alt="Imagen de ejemplo" className="img-fluid " />
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
                                            <h2 className="card-title">Tienda de Comics</h2>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fpresentacion%2Fcoleccionistas_02.png?alt=media&token=89eacb1c-e69c-454c-826d-2535307de624" alt="Imagen de ejemplo" className="img-fluid " />
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

export default App;








