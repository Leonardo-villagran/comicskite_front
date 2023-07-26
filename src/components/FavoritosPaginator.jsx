import Context from "../Context/Context";
import { useContext } from "react";

export default function ProductosPaginator() {
    const {FavoritosPage, setFavoritosPage, FavoritosSize, productos} = useContext(Context);
    return (
        <div className="mt-4">
            {/* Controles de paginación */}
            <div className="d-flex justify-content-center">
                <button  className="mx-2"
                    disabled={FavoritosPage === 1}
                    onClick={() => setFavoritosPage((prevPage) => prevPage - 1)}
                >
                    Anterior
                </button>
                <button
                    disabled={productos.length < FavoritosSize}
                    onClick={() => setFavoritosPage((prevPage) => prevPage + 1)}
                >
                    Siguiente
                </button>
            </div>

            {/* Mostrar información de la paginación */}
            <p>
                Página {FavoritosPage}
            </p>
        </div>
    )
}
