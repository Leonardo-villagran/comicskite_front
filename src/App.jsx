import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home';
import Productos from './views/Productos';
import Detalles from './views/Detalles';
import Favoritos from './views/Favoritos';
import Perfil from './views/Perfil';

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
    // Check if the token exists before proceeding
    if (token) {
      // Update the state with the content of the token
      setTokenContent(token);
      
    } else {
      // Handle the case when there's no token available (optional)
      console.log('No se encontró ningún token. ');
    }
    // Update the state with the content of the token
  }, []);

  //console.log(tokenContent);
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
          <Route path="/detalles/:id_producto" element={tokenContent ? <Detalles /> : <Navigate to="/" />} />
          <Route path="/salir" element={<Salir />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Context.Provider>
    </Router>
  );

}
export default App
