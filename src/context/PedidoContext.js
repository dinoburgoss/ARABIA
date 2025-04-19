import React, { createContext, useState, useEffect } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ubicacion, setUbicacion] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState('Retiro');
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Hamburguesa', descripcion: 'Deliciosa hamburguesa con queso', precio: 500, imagen: 'ruta/a/imagen.jpg' }
  ]);

  // Cargar desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    const direccionGuardada = localStorage.getItem('direccion');
    const metodoPagoGuardado = localStorage.getItem('metodoPago');
    const nombreClienteGuardado = localStorage.getItem('nombreCliente');
    const tipoEntregaGuardado = localStorage.getItem('tipoEntrega');
    const productosGuardados = localStorage.getItem('productos');

    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
    if (direccionGuardada) setDireccion(direccionGuardada);
    if (metodoPagoGuardado) setMetodoPago(metodoPagoGuardado);
    if (nombreClienteGuardado) setNombreCliente(nombreClienteGuardado);
    if (tipoEntregaGuardado) setTipoEntrega(tipoEntregaGuardado);
    if (productosGuardados) setProductos(JSON.parse(productosGuardados));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('direccion', direccion);
    localStorage.setItem('metodoPago', metodoPago);
    localStorage.setItem('nombreCliente', nombreCliente);
    localStorage.setItem('tipoEntrega', tipoEntrega);
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [carrito, direccion, metodoPago, nombreCliente, tipoEntrega, productos]);

  const compararExtras = (extras1 = [], extras2 = []) => {
    if (extras1.length !== extras2.length) return false;
    const ordenar = (arr) => arr.map(e => `${e.nombre}-${e.precio}`).sort().join(',');
    return ordenar(extras1) === ordenar(extras2);
  };

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(
      item =>
        item.nombre === producto.nombre &&
        compararExtras(item.extras, producto.extras)
    );

    if (existente) {
      const nuevoCarrito = carrito.map(item =>
        item.nombre === producto.nombre &&
        compararExtras(item.extras, producto.extras)
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const actualizarProducto = (id, nuevosDatos) => {
    const productosActualizados = productos.map(producto =>
      producto.id === id ? { ...producto, ...nuevosDatos } : producto
    );
    setProductos(productosActualizados);
  };

  return (
    <PedidoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        vaciarCarrito,
        metodoPago,
        setMetodoPago,
        direccion,
        setDireccion,
        ubicacion,
        setUbicacion,
        nombreCliente,
        setNombreCliente,
        tipoEntrega,
        setTipoEntrega,
        productos,
        setProductos,
        actualizarProducto,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
