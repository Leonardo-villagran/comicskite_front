import Navbar from "./NavbarJwt";
import Publicaciones from "../components/Publicaciones";

const ProductosView = () => {

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
                        <Publicaciones />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductosView;
