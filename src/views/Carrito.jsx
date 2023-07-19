import Navbar from "./NavbarJwt";
import Carrito from "../components/Carrito";
const CarritoView = () => {

    return (
        <div>
            <Navbar />

            <div style={{ backgroundColor: "#295b6fff", padding: "1rem" }}>
                <div style={{ backgroundColor: "black", padding: "1rem" }}>
                    <div
                        style={{
                            backgroundColor: "#295b6fff",
                            padding: "1rem",
                            border: "1px solid white",
                        }}
                    >
                        <Carrito />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarritoView;
