import Navbar from "./NavbarJwt";
import NuevoProducto from "../components/NuevoProducto";

const NuevoPRoductoView = () => {

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
                        <NuevoProducto />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoPRoductoView;