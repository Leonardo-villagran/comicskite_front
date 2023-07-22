import Navbar from "./NavbarJwt";
import Productos from "../components/Productos";

const ProductosView = () => {

  return (
    <div>
      <Navbar />
      <div className="caja-primera">
        <div className="caja-segunda">
          <div className="caja-tercera">
          <Productos mensajeDeCarga={"Cargando productos..."} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosView;
