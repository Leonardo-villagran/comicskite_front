import Navbar from "./NavbarJwt";
import EditarProducto from "../components/EditarProducto";

const EditarPRoductoView = () => {

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
                        <EditarProducto />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarPRoductoView;