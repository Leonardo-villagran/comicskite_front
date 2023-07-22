import Navbar from "./NavbarJwt";
import Detalles from "../components/Detalles";

const DetallesView = () => {
  
  return (
    <div>
      <Navbar />
      <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
            <Detalles mensajeDeCarga={"Cargando detalles..."} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesView;
