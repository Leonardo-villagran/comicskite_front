import fotos from "../assets/img/Imagen2.jpg";

export default function Home() {
    return (
        <div className="caja-primera">
        <div className="caja-segunda">
            <div className="caja-tercera">
                    <h2 className="my-auto" style={{ color: '#ebca6d' }}>
                        BIENVENIDO A COMICSKITE
                    </h2>
                    <h2 className="my-auto" style={{ color: '#ebca6d' }}>
                        VENTA DE COMICS
                    </h2>
                    <div className="container">
                        <img className="rounded-5 border border-white border-4" src={fotos} alt="Imagen" style={{ width: '50%', height: '50%'}} />

                    </div>
                </div>
            </div>
        </div>
    )
}

