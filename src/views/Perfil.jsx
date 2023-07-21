import Navbar from "./NavbarJwt";
import Perfil from "../components/Perfil";


const PerfilView = () => {

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
                        <Perfil/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilView;