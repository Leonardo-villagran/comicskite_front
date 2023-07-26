import Context from "../Context/Context";
import { useContext } from "react";

export default function ProductosPaginator() {
    const {ProductosPageSize, ProductosPage,setProductosPage, productos} = useContext(Context);
    return (
        <div className="mt-4">
            {/* Controles de paginación */}
            <div className="d-flex justify-content-center">
                <button  className="me-2 boton-paginator"
                    disabled={ProductosPage === 1}
                    onClick={() => setProductosPage((prevPage) => prevPage - 1)}
                >
                    Anterior
                </button>
                <button className="boton-paginator"
                    disabled={productos.length < ProductosPageSize}
                    onClick={() => setProductosPage((prevPage) => prevPage + 1)}
                >
                    Siguiente
                </button>
            </div>

            {/* Mostrar información de la paginación */}
            <p>
                Página {ProductosPage}
            </p>
        </div>
    )
}
