import Navbar from "./NavbarJwt";
import Detalles from "../components/Detalles";

const DetallesView = () => {
  
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
            <Detalles/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesView;
