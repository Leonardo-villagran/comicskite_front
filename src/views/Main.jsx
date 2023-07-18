import fotos from "../assets/img/Imagen2.jpg";

export default function Home() {
    return (
        <div style={{ backgroundColor: '#295b6fff', padding: '1rem' }}>
            <div style={{ backgroundColor: 'black', padding: '1rem' }}>
                <div style={{ backgroundColor: '#295b6fff', padding: '1rem', border: '1px solid white' }}>

                    <h2 className="my-auto" style={{ color: '#ebca6d' }}>
                        BIENVENIDO A COMICSKITE
                    </h2>
                    <h2 className="my-auto" style={{ color: '#ebca6d' }}>
                        VENTA DE COMICS
                    </h2>
                    <div className="container">
                        <img className="rounded-5 border border-white border-4" src={fotos} alt="Imagen" style={{ width: '80%', height: '80%'}} />

                    </div>
                </div>
            </div>
        </div>
    )
}

