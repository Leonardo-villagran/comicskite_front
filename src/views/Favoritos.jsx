import Navbar from "./NavbarJwt";
import Favoritos from "../components/Favoritos";
const FavoritosView = () => {

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
                        <Favoritos/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritosView;
