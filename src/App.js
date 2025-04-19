// src/App.js

import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PedidoProvider } from './context/PedidoContext';
import Menu from './components/Menu';
import Carrito from './components/Carrito';
import FormularioPedido from './components/FormularioPedido';
import EstadoLocal from './components/EstadoLocal';
import AdminPanel from './components/AdminPanel';
import ConfigAdmin from './components/ConfigAdmin';
import AdminMenu from './components/AdminMenu';
import ContactoCliente from './components/ContactoCliente';
import AdminDashboard from './components/AdminDashboard';
// import RedesSociales from './components/RedesSociales'; // ❌ Eliminado
import Footer from './components/Footer';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [mostrarIconos, setMostrarIconos] = useState(true);
  const [ultimaPosicionScroll, setUltimaPosicionScroll] = useState(0);
  const [esEscritorio, setEsEscritorio] = useState(window.innerWidth > 768);
  const [nombreComercio, setNombreComercio] = useState('');

  useEffect(() => {
    const manejarScroll = () => {
      const posicionActual = window.scrollY;
      setMostrarIconos(posicionActual < ultimaPosicionScroll);
      setUltimaPosicionScroll(posicionActual);
    };

    const manejarResize = () => {
      setEsEscritorio(window.innerWidth > 768);
    };

    window.addEventListener('scroll', manejarScroll);
    window.addEventListener('resize', manejarResize);

    return () => {
      window.removeEventListener('scroll', manejarScroll);
      window.removeEventListener('resize', manejarResize);
    };
  }, [ultimaPosicionScroll]);

  useEffect(() => {
    const fetchNombre = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.nombreComercio) setNombreComercio(data.nombreComercio);
        }
      } catch (error) {
        console.error('Error obteniendo nombre del comercio:', error);
      }
    };

    fetchNombre();
  }, []);

  return (
    <Router>
      <PedidoProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="contenido-app">
                <h1 className="titulo-comercio">{nombreComercio || 'Bienvenidos'}</h1>
                <EstadoLocal />
                <Menu />
                <Carrito />
                <FormularioPedido />
                <ContactoCliente />
                {/* <RedesSociales /> ❌ Eliminado */}
                <Footer />
              </div>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/config" element={<ConfigAdmin />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </PedidoProvider>
    </Router>
  );
}

export default App;
