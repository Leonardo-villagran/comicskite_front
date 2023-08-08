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
                                            color: "#ebca6d",
                                            border: "1px solid white",
                                        }}
                                    >
                                        <div className="card-body text-center">
                                            <h2 className="card-title">Vista de usuario</h2>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fusuario.PNG?alt=media&token=de429c01-607a-4316-8149-ff803b144334" alt="Imagen de ejemplo" className="img-fluid " />
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
                                            <h2 className="card-title">Vista de administrador</h2>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fadministrador.PNG?alt=media&token=7e71a835-e7e1-47eb-9fc6-9668e19078a6" alt="Imagen de ejemplo" className="img-fluid " />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col-12 text-center">
                                <Link to="/" className="boton-personalizado-titulo"
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








