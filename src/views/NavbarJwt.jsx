import { Navbar } from 'react-bootstrap';
import NavbarLogo from '../components/NavbarLogo';
import NavbarButtons from '../components/NavbarButtons';
import NavbarButtonsAdmin from '../components/NavbarButtonsAdmin';
import NavbarTitle from '../components/NavbarTitle';
import Context from '../Context/Context';
import { useContext } from 'react';
import "../assets/css/Navbar.css";

export default function NavbarComponent() {

  const { tokenContent } = useContext(Context);
    return (
      <Navbar bg="dark" variant="dark">
        <div className="navbar-logo container">
          <div className="d-flex align-items-center">
            <NavbarLogo />
          </div>
          <div className="d-box align-items-center">
            <NavbarTitle />
            {tokenContent.administrador === 0 ? <NavbarButtons /> : <NavbarButtonsAdmin />}
          </div>
        </div>
      </Navbar>
    );
  }