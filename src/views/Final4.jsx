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
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                    <Card
                                        className="super_card h-100"
                                        style={{
                                            backgroundColor: "#295b6fff",
                                            color: "#ebca6d",
                                            border: "1px solid white",
                                        }}
                                    >
                                        <div className="card-body text-center">
                                            <h1 className="card-title">Fin</h1>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/comicskite.appspot.com/o/img%2Fpresentacion%2Fhireline_logo_adl.png?alt=media&token=cc787e36-e269-4d06-9e33-0411560a9d04" alt="Imagen de ejemplo" className="img-fluid my-4 w-20" />
                                        
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








