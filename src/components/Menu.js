import md5 from 'md5';
import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PedidoContext } from '../context/PedidoContext';
import { useNavigate } from 'react-router-dom';
import '../styles/menu.css';

const Menu = () => {
  const { agregarAlCarrito } = useContext(PedidoContext);
  const [productos, setProductos] = useState([]);
  const [visibilidadCategorias, setVisibilidadCategorias] = useState({});
  const [categoriasAbiertas, setCategoriasAbiertas] = useState({});
  const [extrasSeleccionados, setExtrasSeleccionados] = useState({});
  const [tituloMenu, setTituloMenu] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuSnap = await getDocs(collection(db, 'menu'));
        const productosData = menuSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const activos = productosData.filter(p => p.activo !== false);
        setProductos(activos);

        const visDocRef = doc(db, 'menu_config', 'visibilidadCategorias');
        const visDoc = await getDoc(visDocRef);
        let visibilidad = visDoc.exists() ? visDoc.data() : {};
        const categoriasDelMenu = new Set(activos.map(p => p.categoria || 'Sin categoría'));
        let actualizado = false;
        categoriasDelMenu.forEach(cat => {
          if (!(cat in visibilidad)) {
            visibilidad[cat] = true;
            actualizado = true;
          }
        });
        if (actualizado) await setDoc(visDocRef, visibilidad);
        setVisibilidadCategorias(visibilidad);

        const configSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (configSnap.exists()) {
          const data = configSnap.data();
          if (data.tituloMenu) setTituloMenu(data.tituloMenu);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const agruparPorCategoria = (items) =>
    items.reduce((acc, item) => {
      const categoria = item.categoria || 'Sin categoría';
      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push(item);
      return acc;
    }, {});

  const categoriasAgrupadas = agruparPorCategoria(productos);

  const toggleCategoria = (categoria) => {
    setCategoriasAbiertas((prev) => ({
      ...prev,
      [categoria]: !prev[categoria],
    }));
  };

  const toggleExtra = (productoId, extra) => {
    setExtrasSeleccionados((prev) => {
      const extrasDelProducto = prev[productoId] || [];
      const yaSeleccionado = extrasDelProducto.find((e) => e.nombre === extra.nombre);
      const nuevosExtras = yaSeleccionado
        ? extrasDelProducto.filter((e) => e.nombre !== extra.nombre)
        : [...extrasDelProducto, extra];
      return {
        ...prev,
        [productoId]: nuevosExtras,
      };
    });
  };

  const handleAgregar = (producto) => {
    const extras = extrasSeleccionados[producto.id] || [];

    // Convertir precios a número
    const extrasNormalizados = extras.map(extra => ({
      ...extra,
      precio: parseFloat(extra.precio) || 0
    }));

    // Clave única por producto + extras
    const claveExtras = extrasNormalizados
      .map(e => `${e.nombre}-${e.precio}`)
      .sort()
      .join('|');

    const hashExtras = md5(claveExtras);

    const productoConExtras = {
      ...producto,
      extras: extrasNormalizados,
      itemKey: `${producto.id}-${hashExtras}`
    };

    agregarAlCarrito(productoConExtras);
    setExtrasSeleccionados((prev) => ({ ...prev, [producto.id]: [] }));
  };

  return (
    <div className="menu-contenedor">
      {/* Botón modo admin */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="btn-admin-fixed"
        title="Administrar"
      >
        ⚙
      </button>

      {/* Título del menú */}
      <h1 className="menu-titulo">{tituloMenu || 'Menú Burger Queen'}</h1>

      <div className="filtros-contenedor">
        {Object.entries(categoriasAgrupadas)
          .filter(([cat]) => visibilidadCategorias[cat] !== false)
          .map(([categoria, productos]) => (
            <div key={categoria}>
              <button className="filtro-toggle" onClick={() => toggleCategoria(categoria)}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </button>
              {categoriasAbiertas[categoria] && (
                <div className="filtro-contenido">
                  <div className="productos-grid">
                    {productos.map((producto) => (
                      <div className="producto-card" key={producto.id}>
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="producto-img"
                        />
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripcion}</p>
                        <p className="precio">${producto.precio}</p>
                        {producto.extras?.length > 0 && (
                          <div className="extras-container">
                            <p className="extras-titulo">Extras:</p>
                            {producto.extras.map((extra, i) => {
                              const seleccionado =
                                extrasSeleccionados[producto.id]?.some((e) => e.nombre === extra.nombre);
                              return (
                                <button
                                  key={i}
                                  className={`extra-btn ${seleccionado ? 'seleccionado' : ''}`}
                                  onClick={() => toggleExtra(producto.id, extra)}
                                >
                                  {extra.nombre} (+${extra.precio})
                                </button>
                              );
                            })}
                          </div>
                        )}
                        <button
                          className="btn-agregar"
                          onClick={() => handleAgregar(producto)}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
