import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../Styles/Navbar.css";

export default function NavbarButtons() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <header>
      <div className="div-fabars">
        <Button className="nav-btn" onClick={toggleMenu}>
          <FaBars />
        </Button>
      </div>
      <Navbar className="w-100 justify-content-between mx-3">
        <Nav className={`nav-buttons ${showMenu ? "active" : ""}`}>
          <div className="navbar-buttons">
            <Link to="/productos">
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Productos
              </Button>
            </Link>
            <Link to="/publicaciones">
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Publicaciones
              </Button>
            </Link>
            <Link to="/favoritos">
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Mis Favoritos
              </Button>
            </Link>
            <Link to="/perfil">
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Perfil
              </Button>
            </Link>
            <Link to="/carro_compras">
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Carro de Compras
              </Button>
            </Link>
            <Link to="/salir">
              <Button
                variant="primary"
                className="m-1 text-uppercase"
                style={{
                  backgroundColor: "black",
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Salir
              </Button>
            </Link>
          </div>
        </Nav>
      </Navbar>
    </header>
  );
}
