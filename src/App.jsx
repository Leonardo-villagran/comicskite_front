import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Context from "./Context/Context";
import { decodeJWT } from './services/servicesJwt';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './views/Home';
import Productos from './views/Productos';
import Detalles from './views/Detalles';
import Favoritos from './views/Favoritos';
import Perfil from './views/Perfil';
import NuevoProducto from './views/NuevoProducto';
import EditarProducto from './views/EditarProducto';
import CarroCompras from './views/Carrito';
import Publicaciones from './views/Publicaciones';
import Footer from './views/Footer';
import Registrar from './views/Registrar';
import IniciarSesion from './views/IniciarSesion';
import OrdenDeCompra from './views/OrdenesDeCompra';
import Salir from './views/Salir';
import NotFound from './views/NotFound';


function App() {

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [tokenContent, setTokenContent] = useState('');

  const [ProductosPage, setProductosPage] = useState(1);
  const [ProductosPageSize, setProductosPageSize] = useState(8);

  const [PublicacionesPage, setPublicacionesPage] = useState(1);
  const [PublicacionesSize, setPublicacionesSize] = useState(8);

  const [OrdenPage, setOrdenPage] = useState(1);
  const [OrdenSize, setOrdenSize] = useState(4);

  const [ordenesCompra, setOrdenesCompra] = useState([]);

  const globalState = {ordenesCompra, setOrdenesCompra, OrdenPage, setOrdenPage, OrdenSize, setOrdenSize, PublicacionesPage, setPublicacionesPage, PublicacionesSize, setPublicacionesSize, ProductosPageSize, setProductosPageSize, ProductosPage, setProductosPage, carrito, setCarrito, producto, setProducto, productos, setProductos, tokenContent, setTokenContent, buscar, setBuscar };

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    // Check if the token exists before proceeding
    if (decodedToken) setTokenContent(decodedToken);
    else console.log('No se encontró ningún token. ');

  }, []);
  //console.log("Contenido token: ", tokenContent);
  //console.log("Producto: ", producto);
  //console.log("Carrito: ", carrito);
  const rol=tokenContent.administrador;
  const algo=tokenContent && (rol===1);
  console.log("Rol: ", rol,algo);

  return (
    <Router>
      <Context.Provider value={globalState}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={!tokenContent ? <Home /> : <Navigate to="/productos" />} />
            <Route path="/registrar" element={tokenContent ? <Navigate to="/" /> : <Registrar />} />
            <Route path="/iniciar_sesion" element={tokenContent ? <Navigate to="/" /> : <IniciarSesion />} />
            <Route path="/productos" element={tokenContent ? <Productos /> : <Navigate to="/" />} />
            <Route path="/favoritos" element={tokenContent ? <Favoritos /> : <Navigate to="/" />} />
            <Route path="/perfil" element={tokenContent ? <Perfil /> : <Navigate to="/" />} />
            <Route path="/publicaciones" element={(tokenContent && (rol===1)) ? <Publicaciones /> : <Navigate to="/" />} />
            <Route path="/nuevo_producto" element={(tokenContent && (rol===1)) ? <NuevoProducto /> : <Navigate to="/" />} />
            <Route path="/editar_producto/:id_producto" element={(tokenContent && (rol===1)) ? <EditarProducto /> : <Navigate to="/" />} />
            <Route path="/carro_compras" element={tokenContent ? <CarroCompras /> : <Navigate to="/" />} />
            <Route path="/detalles/:id_producto" element={tokenContent ? <Detalles /> : <Navigate to="/" />} />
            <Route path="/orden_compra" element={(tokenContent && (rol===1)) ? <OrdenDeCompra /> : <Navigate to="/" />} />
            <Route path="/salir" element={tokenContent ? <Salir /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </Context.Provider>
    </Router>
  );
}

export default App;