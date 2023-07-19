import Navbar from "./NavbarJwt";
import Productos from "../components/Productos";

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
            <Productos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosView;
