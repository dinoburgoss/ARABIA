// src/components/AdminPanel.js
import React, { useState } from 'react';
import { usePedido } from '../context/PedidoContext';

const AdminPanel = () => {
  const { productos, actualizarProducto } = usePedido();  // Obtenemos los productos desde el contexto
  const [productoEditado, setProductoEditado] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado({ ...productoEditado, [name]: value });
  };

  const handleSelectProducto = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    setProductoEditado(producto);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(productoEditado);  // Actualizamos el producto en el contexto
    setProductoEditado({ id: '', nombre: '', descripcion: '', precio: '', imagen: '' });  // Limpiamos el formulario
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <div className="producto-lista">
        <h3>Seleccionar Producto a Editar</h3>
        <select onChange={(e) => handleSelectProducto(e.target.value)} value={productoEditado.id}>
          <option value="">Seleccione un producto</option>
          {productos.map(producto => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre}
            </option>
          ))}
        </select>
      </div>

      {productoEditado.id && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={productoEditado.descripcion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Imagen URL</label>
            <input
              type="text"
              name="imagen"
              value={productoEditado.imagen}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
