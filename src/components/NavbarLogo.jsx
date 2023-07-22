import Navbar from 'react-bootstrap/Navbar';
import fotos from "../assets/img/comicskite_01.jpg";

export default function NavbarTitle() {
    return (
        <Navbar.Brand href="/">
        <div className="circle-border">
            <img
                src={fotos}
                className="d-inline-block align-top"
                alt="Logo"
            />
        </div>
    </Navbar.Brand>
    );
}