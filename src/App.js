// src/App.js

import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PedidoProvider } from './context/PedidoContext';
import { AuthProvider } from './context/AuthContext';
import RutaPrivada from './components/RutaPrivada';

import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import RecuperarClave from './pages/RecuperarClave';
import Menu from './components/Menu';
import Carrito from './components/Carrito';
import FormularioPedido from './components/FormularioPedido';
import EstadoLocal from './components/EstadoLocal';
import AdminPanel from './components/AdminPanel';
import ConfigAdmin from './components/ConfigAdmin';
import AdminMenu from './components/AdminMenu';
import ContactoCliente from './components/ContactoCliente';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import TestFirebase from './TestFirebase';

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
      <AuthProvider>
        <PedidoProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recuperar-clave" element={<RecuperarClave />} />

            {/* Ruta protegida por login */}
            <Route
              path="/"
              element={
                <RutaPrivada>
                  <div className="contenido-app">
                    <Header />
                    <h1 className="titulo-comercio">{nombreComercio || 'Bienvenidos'}</h1>
                    <EstadoLocal />
                    <Menu />
                    <Carrito />
                    <FormularioPedido />
                    <ContactoCliente />
                    <Footer />
                  </div>
                </RutaPrivada>
              }
            />

            {/* Rutas admin protegidas por rol */}
            <Route
              path="/admin"
              element={
                <RutaPrivada soloAdmin>
                  <AdminPanel />
                </RutaPrivada>
              }
            />

            <Route
              path="/admin/config"
              element={
                <RutaPrivada soloAdmin>
                  <ConfigAdmin />
                </RutaPrivada>
              }
            />

            <Route
              path="/admin/menu"
              element={
                <RutaPrivada soloAdmin>
                  <AdminMenu />
                </RutaPrivada>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <RutaPrivada soloAdmin>
                  <AdminDashboard />
                </RutaPrivada>
              }
            />

            {/* Ruta de prueba */}
            <Route path="/test" element={<TestFirebase />} />
          </Routes>
        </PedidoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

