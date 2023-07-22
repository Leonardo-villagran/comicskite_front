import RegistrarComp from "../components/Registrar";
import Navbar from "./Navbar"

export default function Registrar() {
  return (
    <div>
      <Navbar/>
      <div className="caja-primera">
                <div className="caja-segunda">
                    <div className="caja-tercera">
            <RegistrarComp/>
          </div>
        </div>
      </div>
    </div>
  )
}
