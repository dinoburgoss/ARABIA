import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { PedidoContext } from '../context/PedidoContext';

const AdminMenu = () => {
  const { agregarAlCarrito } = useContext(PedidoContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', precio: '', imagen: '', categoria: '', extras: [], activo: true });
  const [nuevoExtra, setNuevoExtra] = useState({ nombre: '', precio: '', activo: true });
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [visibilidadCategorias, setVisibilidadCategorias] = useState({});
  const navigate = useNavigate();

  const fetchProductos = async () => {
    const querySnapshot = await getDocs(collection(db, 'menu'));
    const productosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProductos(productosData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProductos();
        const visSnap = await getDocs(collection(db, 'menu_config'));
        const visDoc = visSnap.docs.find(doc => doc.id === 'visibilidadCategorias');
        if (visDoc) setVisibilidadCategorias(visDoc.data());
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductoChange = (id, campo, valor) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  };

  const handleGuardarProducto = async (producto) => {
    try {
      await updateDoc(doc(db, 'menu', producto.id), producto);
      alert('Producto actualizado');
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleNuevoProductoChange = (campo, valor) => {
    setNuevoProducto((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleImagenChange = (e, productoId = null) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      alert('La imagen no debe superar los 500 KB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (productoId) {
        setProductos((prev) =>
          prev.map((p) => (p.id === productoId ? { ...p, imagen: reader.result } : p))
        );
      } else {
        setNuevoProducto((prev) => ({ ...prev, imagen: reader.result }));
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleToggleCategoriaVisible = async (cat) => {
    const updated = { ...visibilidadCategorias, [cat]: !visibilidadCategorias[cat] };
    setVisibilidadCategorias(updated);
    await setDoc(doc(db, 'menu_config', 'visibilidadCategorias'), updated);
  };

  const handleEliminarCategoria = async (categoria) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la categoría "${categoria}"?\nSe eliminarán todos los productos relacionados y no se podrá recuperar.`
    );
    if (!confirmar) return;

    try {
      const querySnapshot = await getDocs(collection(db, 'menu'));
      const batch = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if ((data.categoria || '').toLowerCase() === categoria.toLowerCase()) {
          batch.push(deleteDoc(doc(db, 'menu', docSnap.id)));
        }
      });

      await Promise.all(batch);

      const updated = { ...visibilidadCategorias };
      delete updated[categoria];
      await setDoc(doc(db, 'menu_config', 'visibilidadCategorias'), updated);

      await fetchProductos();
      setVisibilidadCategorias(updated);
      alert(`Categoría "${categoria}" eliminada correctamente.`);
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  const handleExtraChange = (productoId, extraIdx, campo, valor) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoId
          ? {
              ...prod,
              extras: prod.extras.map((extra, idx) =>
                idx === extraIdx ? { ...extra, [campo]: valor } : extra
              )
            }
          : prod
      )
    );
  };

  const handleToggleExtraActivo = (productoId, extraIdx) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoId
          ? {
              ...prod,
              extras: prod.extras.map((extra, idx) =>
                idx === extraIdx ? { ...extra, activo: !extra.activo } : extra
              )
            }
          : prod
      )
    );
  };

  const handleEliminarExtra = (productoId, extraIdx) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoId
          ? {
              ...prod,
              extras: prod.extras.filter((_, idx) => idx !== extraIdx)
            }
          : prod
      )
    );
  };

  const handleAgregarNuevoProducto = async () => {
    const id = `${nuevoProducto.categoria.toLowerCase()}_${uuidv4()}`;
    const productoData = {
      ...nuevoProducto,
      categoria: nuevoProducto.categoria.toLowerCase(),
      precio: parseFloat(nuevoProducto.precio),
      activo: true
    };
    try {
      await setDoc(doc(db, 'menu', id), productoData);
      await fetchProductos();
      setNuevoProducto({ nombre: '', descripcion: '', precio: '', imagen: '', categoria: '', extras: [], activo: true });
      setNuevoExtra({ nombre: '', precio: '', activo: true });
      alert('Producto agregado correctamente');
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const todasCategorias = [...new Set(productos.map(p => p.categoria?.toLowerCase() || 'otros'))];

  const productosPorCategoria = productos.reduce((acc, prod) => {
    const categoria = prod.categoria?.toLowerCase() || 'otros';
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(prod);
    return acc;
  }, {});

  if (loading) return <p style={{ color: '#fff' }}>Cargando...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#4FC3F7', textAlign: 'center' }}>📋 Menú del Comercio</h2>

      {todasCategorias.map((cat) => (
        <div key={cat}>
          <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <button
              onClick={() => setCategoriaAbierta(categoriaAbierta === cat ? null : cat)}
              style={{
                backgroundColor: '#4FC3F7',
                padding: 10,
                flexGrow: 1,
                textAlign: 'left',
                border: 'none',
                borderRadius: 6,
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}
            >
              {cat}
            </button>
            <label style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={visibilidadCategorias[cat] !== false}
                onChange={() => handleToggleCategoriaVisible(cat)}
                style={{ transform: 'scale(1.2)' }}
              />
              Mostrar
            </label>
            <button
              onClick={() => handleEliminarCategoria(cat)}
              style={{
                backgroundColor: '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer'
              }}
            >
              🗑
            </button>
          </div>
          {categoriaAbierta === cat && (
            <div style={{ padding: 10, background: '#1f1f1f', borderRadius: 8, marginBottom: 20 }}>
              {productosPorCategoria[cat].map((prod) => (
                <div key={prod.id} style={{ marginBottom: 10, border: '1px solid #444', padding: 10, borderRadius: 6 }}>
                  <input type="text" value={prod.nombre} onChange={(e) => handleProductoChange(prod.id, 'nombre', e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
                  <input type="text" value={prod.descripcion} onChange={(e) => handleProductoChange(prod.id, 'descripcion', e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
                  <input type="number" value={prod.precio} onChange={(e) => handleProductoChange(prod.id, 'precio', parseFloat(e.target.value))} style={{ width: '100%', marginBottom: 8 }} />
                  <input type="file" accept="image/*" onChange={(e) => handleImagenChange(e, prod.id)} style={{ width: '100%', marginBottom: 8 }} />
                  {prod.imagen && <img src={prod.imagen} alt="Imagen" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: 8 }} />}

                  <h4 style={{ color: '#FACC15', marginTop: 10 }}>Extras</h4>
                  {prod.extras?.map((extra, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input type="text" value={extra.nombre} onChange={(e) => handleExtraChange(prod.id, idx, 'nombre', e.target.value)} style={{ width: '35%' }} />
                      <input type="number" value={extra.precio} onChange={(e) => handleExtraChange(prod.id, idx, 'precio', e.target.value)} style={{ width: '25%' }} />
                      <button onClick={() => handleToggleExtraActivo(prod.id, idx)} style={{ width: '20%' }}>{extra.activo ? '👁️' : '🙈'}</button>
                      <button onClick={() => handleEliminarExtra(prod.id, idx)} style={{ width: '20%' }}>🗑️</button>
                    </div>
                  ))}

                  <button onClick={() => handleGuardarProducto(prod)} style={{ padding: 8, backgroundColor: '#4CAF50', color: '#fff', borderRadius: 6 }}>💾 Guardar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <h3 style={{ color: '#FACC15', marginTop: 30 }}>🆕 Agregar nuevo producto</h3>
      <div style={{ marginBottom: 30 }}>
        <input type="text" placeholder="Nombre" value={nuevoProducto.nombre} onChange={(e) => handleNuevoProductoChange('nombre', e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <input type="text" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={(e) => handleNuevoProductoChange('descripcion', e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <input type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={(e) => handleNuevoProductoChange('precio', e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <input type="text" placeholder="Categoría (ej: hamburguesas)" value={nuevoProducto.categoria} onChange={(e) => handleNuevoProductoChange('categoria', e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <input type="file" accept="image/*" onChange={handleImagenChange} style={{ width: '100%', marginBottom: 8 }} />
        {nuevoProducto.imagen && <img src={nuevoProducto.imagen} alt="Vista previa" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: 8 }} />}
        <button onClick={handleAgregarNuevoProducto} style={{ marginTop: 10, padding: 10, backgroundColor: '#4FC3F7', color: '#000', borderRadius: 6, fontWeight: 'bold' }}>✔ Crear producto</button>
      </div>
    </div>
  );
};

export default AdminMenu;
