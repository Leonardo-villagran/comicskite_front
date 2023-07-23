import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../assets/css/Navbar.css";
import { BsCart4,BsFillPersonFill } from "react-icons/bs";


export default function NavbarButtons() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const setActiveClass = ({ isActive }) => (isActive ? "isactive" : "inactive");

  return (
    <header className="header-btn d-flex align-items-center">
      <div className="div-fabars">
        <Button className="nav-btn" onClick={toggleMenu}>
          <FaBars />
        </Button>
      </div>
      <Navbar className="w-100 justify-content-center mx-3">
        <Nav className={`nav-buttons ${showMenu ? "active" : ""}`}>
          <div className="navbar-buttons">
            <NavLink to="/productos" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Productos
              </Button>
            </NavLink>
            <NavLink to="/publicaciones" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Publicaciones
              </Button>
            </NavLink>
            <NavLink to="/orden_compra" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Orden de compra
              </Button>
            </NavLink>
            <NavLink to="/favoritos" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Mis Favoritos
              </Button>
            </NavLink>
            <NavLink to="/perfil" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
               <BsFillPersonFill />
              </Button>
            </NavLink>
            <NavLink to="/carro_compras" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 mr-2 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
               < BsCart4  />
              </Button>
            </NavLink>
            
            <NavLink to="/salir" className={setActiveClass}>
              <Button
                variant="primary"
                className="m-1 text-uppercase custom-button"
                style={{
                  borderColor: "#ebca6d",
                  color: "#ebca6d",
                  fontSize: "12px",
                }}
              >
                Salir
              </Button>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </header>
  );
}
