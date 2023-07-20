import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home';
import Productos from './views/Productos';
import Detalles from './views/Detalles';
import Favoritos from './views/Favoritos';
import Perfil from './views/Perfil';
//import NuevoProducto from './views/NuevoProducto';
import CarroCompras from './views/Carrito';
import Publicaciones from './views/Publicaciones';
import NuevoProducto from './views/NuevoProducto';

import Registrar from './views/Registrar';
import IniciarSesion from './views/IniciarSesion';

import Salir from './views/Salir'; // Importamos el componente Salir

import NotFound from './views/NotFound';

import {BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
//Importación de los Hooks que serán utilizados.

import Context from "./Context/Context";
import { useState, useEffect } from 'react';


function App() {

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState([]);
  
  const [tokenContent, setTokenContent] = useState('');

  const globalState = {producto, setProducto, productos, setProductos, tokenContent, setTokenContent};

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    // Check if the token exists before proceeding
    if (decodedToken) {
      // Update the state with the content of the token
      setTokenContent(decodedToken);
      
    } else {
      // Handle the case when there's no token available (optional)
      console.log('No se encontró ningún token. ');
    }
    // Update the state with the content of the token
  }, []);
  // Función para decodificar el token JWT
  const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

  return JSON.parse(jsonPayload);
};
  console.log(tokenContent);
  console.log(producto);
  return (
    <Router>
      <Context.Provider value={globalState}>
        <Routes>
          <Route path="/" element={!tokenContent ? <Home /> : <Navigate to="/productos" />} />
          <Route path="/registrar" element={tokenContent ? <Productos /> : <Registrar /> } />
          <Route path="/iniciar_sesion" element={tokenContent ? <Productos /> : <IniciarSesion/>} />
          <Route path="/productos" element={tokenContent ? <Productos /> : <Navigate to="/" />} />
          <Route path="/favoritos" element={tokenContent ? <Favoritos /> : <Navigate to="/" />} />
          <Route path="/perfil" element={tokenContent ? <Perfil /> : <Navigate to="/" />} />
          <Route path="/publicaciones" element={tokenContent ? <Publicaciones /> : <Navigate to="/" />} />
          <Route path="/nuevo_producto" element={tokenContent ? <NuevoProducto /> : <Navigate to="/" />} />
          <Route path="/carro_compras" element={tokenContent ? <CarroCompras /> : <Navigate to="/" />} />
          <Route path="/detalles/:id_producto" element={tokenContent ? <Detalles /> : <Navigate to="/" />} />
          <Route path="/salir" element={<Salir />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context.Provider>
    </Router>
  );

}
export default App
