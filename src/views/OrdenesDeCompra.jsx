import Navbar from "./NavbarJwt";
import OrdenDeCompra from "../components/OrdenesDeCompra";


const OrdenDeCompraView = () => {

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
                        <OrdenDeCompra/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdenDeCompraView;