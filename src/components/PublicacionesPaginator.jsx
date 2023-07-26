import Context from "../Context/Context";
import { useContext } from "react";

export default function ProductosPaginator() {
    const { PublicacionesPage, setPublicacionesPage, PublicacionesSize, productos} = useContext(Context);
    return (
        <div className="mt-4">
            {/* Controles de paginación */}
            <div className="d-flex justify-content-center">
                <button  className="me-2 boton-paginator"
                    disabled={PublicacionesPage === 1}
                    onClick={() => setPublicacionesPage((prevPage) => prevPage - 1)}
                >
                    Anterior
                </button>
                <button className="boton-paginator"
                    disabled={productos.length < PublicacionesSize}
                    onClick={() => setPublicacionesPage((prevPage) => prevPage + 1)}
                >
                    Siguiente
                </button>
            </div>

            {/* Mostrar información de la paginación */}
            <p>
                Página {PublicacionesPage}
            </p>
        </div>
    )
}
