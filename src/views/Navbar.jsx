import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../assets/css/Navbar.css";

export default function navbar() {
  const setActiveClass = ({ isActive }) => (isActive ? "isactive" : "inactive");

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="navbar-inicio">
        <Navbar.Brand href="/">
          <div className="circle-border">
            <img
              src="img/comicskite_01.png"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </div>
        </Navbar.Brand>
        <h2 className="mx-auto" style={{ color: "#ebca6d" }}>
          COMICSKITES - VENTA DE COMICS
        </h2>
        <Nav className="ml-auto">
          <NavLink to="/registrar" className={setActiveClass}>
            <Button
              variant="primary"
              className="mr-2 text-uppercase custom-button"
              style={{
                borderColor: "#ebca6d",
                color: "#ebca6d",
                fontSize: "12px",
              }}
            >
              Regístrarse aquí
            </Button>
          </NavLink>
          <NavLink to="/iniciar_sesion" className={setActiveClass}>
            <Button
              variant="primary"
              className="text-uppercase custom-button"
              style={{
                borderColor: "#ebca6d",
                color: "#ebca6d",
                marginLeft: "10px",
                fontSize: "12px",
              }}
            >
              Iniciar sesión
            </Button>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
