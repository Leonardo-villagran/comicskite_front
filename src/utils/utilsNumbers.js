// Función para formatear números con punto como separador de miles
export const formatearNumeroConPunto = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

