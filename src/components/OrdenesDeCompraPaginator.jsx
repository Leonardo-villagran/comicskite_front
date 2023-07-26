import Context from "../Context/Context";
import { useContext } from "react";

export default function ProductosPaginator() {
    const { OrdenPage, setOrdenPage, OrdenSize,ordenesCompra} = useContext(Context);
    return (
        <div className="mt-4">
            {/* Controles de paginación */}
            <div className="d-flex justify-content-center ">
                <button  className="me-2 boton-paginator"
                    disabled={OrdenPage === 1}
                    onClick={() => setOrdenPage((prevPage) => prevPage - 1)}
                >
                    Anterior
                </button>
                <button className="boton-paginator"
                    disabled={ordenesCompra.length < OrdenSize}
                    onClick={() => setOrdenPage((prevPage) => prevPage + 1)}
                >
                    Siguiente
                </button>
            </div>

            {/* Mostrar información de la paginación */}
            <p>
                Página {OrdenPage}
            </p>
        </div>
    )
}
